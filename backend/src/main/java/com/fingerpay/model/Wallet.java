package com.fingerpay.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Wallet(String name, Double balance, User user) {
        this.name = name;
        this.balance = balance;
        this.user = user;
    }
}
