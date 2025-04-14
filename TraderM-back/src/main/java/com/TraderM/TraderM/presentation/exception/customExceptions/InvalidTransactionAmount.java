package com.TraderM.TraderM.presentation.exception.customExceptions;

public class InvalidTransactionAmount extends RuntimeException {
    public InvalidTransactionAmount(String message) {
        super(message);
    }
}
