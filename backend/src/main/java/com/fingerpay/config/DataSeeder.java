package com.fingerpay.config;

import com.fingerpay.model.FingerprintMap;
import com.fingerpay.model.User;
import com.fingerpay.model.Wallet;
import com.fingerpay.repository.FingerprintMapRepository;
import com.fingerpay.repository.UserRepository;
import com.fingerpay.repository.WalletRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, WalletRepository walletRepository,
            FingerprintMapRepository fingerprintMapRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User user = new User("Demo User");
                userRepository.save(user);

                Wallet personal = new Wallet("Personal Card", 500.00, user);
                Wallet family = new Wallet("Family Fund", 1000.00, user);
                Wallet company = new Wallet("Company Expense", 5000.00, user);
                walletRepository.saveAll(Arrays.asList(personal, family, company));

                FingerprintMap indexMap = new FingerprintMap(user, "INDEX", personal);
                FingerprintMap middleMap = new FingerprintMap(user, "MIDDLE", family);
                FingerprintMap ringMap = new FingerprintMap(user, "RING", company);
                fingerprintMapRepository.saveAll(Arrays.asList(indexMap, middleMap, ringMap));

                System.out.println("Data Seeding Completed");
            }
        };
    }
}
