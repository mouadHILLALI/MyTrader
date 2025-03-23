package com.TraderM.TraderM.presentation.exception.customExceptions;

public class WrongAuthException extends RuntimeException {
    public WrongAuthException(String message) {
        super(message);
    }
}
