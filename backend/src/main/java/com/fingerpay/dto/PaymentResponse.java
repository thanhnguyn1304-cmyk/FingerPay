package com.fingerpay.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponse {
    private String status;
    private String walletName;
    private Double remainingBalance;
    private String message;
}
