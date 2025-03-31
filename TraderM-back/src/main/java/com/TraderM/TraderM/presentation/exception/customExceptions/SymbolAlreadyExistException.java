package com.TraderM.TraderM.presentation.exception.customExceptions;

public class SymbolAlreadyExistException extends RuntimeException {
    public SymbolAlreadyExistException(String message) {
        super(message);
    }
}
