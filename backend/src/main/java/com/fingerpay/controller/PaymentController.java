package com.fingerpay.controller;

import com.fingerpay.dto.PaymentRequest;
import com.fingerpay.dto.PaymentResponse;
import com.fingerpay.model.FingerprintMap;
import com.fingerpay.model.User;
import com.fingerpay.model.Wallet;
import com.fingerpay.repository.FingerprintMapRepository;
import com.fingerpay.repository.UserRepository;
import com.fingerpay.repository.WalletRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend access
public class PaymentController {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final FingerprintMapRepository fingerprintMapRepository;

    public PaymentController(UserRepository userRepository, WalletRepository walletRepository,
            FingerprintMapRepository fingerprintMapRepository) {
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.fingerprintMapRepository = fingerprintMapRepository;
    }

    @PostMapping("/pay")
    public ResponseEntity<PaymentResponse> pay(@RequestBody PaymentRequest request) {
        // 1. Validate User
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new PaymentResponse("ERROR", null, null, "User not found"));
        }
        User user = userOpt.get();

        // 2. Find Wallet by Finger Type
        Optional<FingerprintMap> mapOpt = fingerprintMapRepository.findByFingerKeyAndUser(request.getFingerType(),
                user);
        if (mapOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new PaymentResponse("ERROR", null, null, "Fingerprint not configured"));
        }
        Wallet wallet = mapOpt.get().getWallet();

        // 3. Check Balance
        if (wallet.getBalance() < request.getAmount()) {
            return ResponseEntity.badRequest()
                    .body(new PaymentResponse("ERROR", wallet.getName(), wallet.getBalance(), "Insufficient funds"));
        }

        // 4. Deduct and Save
        wallet.setBalance(wallet.getBalance() - request.getAmount());
        walletRepository.save(wallet);

        return ResponseEntity.ok(new PaymentResponse("SUCCESS", wallet.getName(), wallet.getBalance(),
                "Payment processed successfully"));
    }

    @GetMapping("/wallets/{userId}")
    public ResponseEntity<List<Wallet>> getWallets(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(walletRepository.findByUser(userOpt.get()));
    }
}
