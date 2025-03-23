package com.TraderM.TraderM.presentation.exception;

import com.TraderM.TraderM.presentation.dto.response.ErrorRes;
import com.TraderM.TraderM.presentation.exception.customExceptions.WrongAuthException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WrongAuthException.class)
    public ResponseEntity<ErrorRes> handleWrongAuthException(WrongAuthException e , HttpServletRequest request) {
        return ResponseEntity.badRequest().body(new ErrorRes(LocalDateTime.now(),
                400,e.getMessage(), request.getRequestURI()
                ));
    }
}
