package com.TraderM.TraderM.presentation.exception.customExceptions;

public class SupplyCannotBeNegative extends RuntimeException {
    public SupplyCannotBeNegative(String message) {
        super(message);
    }
}
