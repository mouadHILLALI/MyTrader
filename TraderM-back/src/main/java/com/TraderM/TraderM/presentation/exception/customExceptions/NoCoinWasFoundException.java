package com.TraderM.TraderM.presentation.exception.customExceptions;

public class NoCoinWasFoundException extends RuntimeException {
    public NoCoinWasFoundException(String message) {
        super(message);
    }
}
