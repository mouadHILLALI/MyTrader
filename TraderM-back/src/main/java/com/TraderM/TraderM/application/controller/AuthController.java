package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.infastructure.service.JwtService;
import com.TraderM.TraderM.presentation.dto.request.AuthRegisterReqDto;
import com.TraderM.TraderM.presentation.dto.request.AuthReqLoginDto;
import com.TraderM.TraderM.presentation.dto.response.AuthResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthResDto> register(@RequestBody AuthRegisterReqDto request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .twoFactorAuth(false)
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResDto( user.getUsername() ,token, user.getRole(),null, user.isTwoFactorAuth()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResDto> login(@RequestBody AuthReqLoginDto request) {
        Optional<User> userOptional = userRepository.findByUsername(request.username());

        if (userOptional.isEmpty() || !passwordEncoder.matches(request.password(), userOptional.get().getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        String token = jwtService.generateToken(userOptional.get());
        return ResponseEntity.ok(new AuthResDto( userOptional.get().getUsername() ,token, userOptional.get().getRole(),null, userOptional.get().isTwoFactorAuth()));
    }
}
