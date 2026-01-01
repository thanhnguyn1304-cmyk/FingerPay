package com.fingerpay.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class FingerprintMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fingerKey; // INDEX, MIDDLE, RING

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    public FingerprintMap(User user, String fingerKey, Wallet wallet) {
        this.user = user;
        this.fingerKey = fingerKey;
        this.wallet = wallet;
    }
}
