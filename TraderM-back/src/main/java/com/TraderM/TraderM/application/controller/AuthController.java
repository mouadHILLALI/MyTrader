package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.usecase.AuthUseCase;
import com.TraderM.TraderM.application.usecase.Impl.AuthUseCaseImpl;
import com.TraderM.TraderM.presentation.dto.request.AuthRegisterReqDto;
import com.TraderM.TraderM.presentation.dto.request.AuthReqLoginDto;
import com.TraderM.TraderM.presentation.dto.response.AuthResDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthUseCase authUseCase;

    @PostMapping("/register")
    public ResponseEntity<AuthResDto> register(@RequestBody @Valid AuthRegisterReqDto request) {
        return ResponseEntity.ok(authUseCase.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResDto> login(@RequestBody @Valid AuthReqLoginDto request) {
        return ResponseEntity.ok(authUseCase.login(request));
    }
}
