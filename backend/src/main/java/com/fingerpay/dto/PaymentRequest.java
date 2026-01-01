package com.fingerpay.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long userId;
    private String fingerType; // INDEX, MIDDLE, RING
    private Double amount;
}
