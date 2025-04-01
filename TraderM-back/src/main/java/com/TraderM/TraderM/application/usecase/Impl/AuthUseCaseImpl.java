package com.TraderM.TraderM.application.usecase.Impl;

import com.TraderM.TraderM.application.usecase.AuthUseCase;
import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.infastructure.service.JwtService;
import com.TraderM.TraderM.presentation.dto.request.AuthRegisterReqDto;
import com.TraderM.TraderM.presentation.dto.request.AuthReqLoginDto;
import com.TraderM.TraderM.presentation.dto.response.AuthResDto;
import com.TraderM.TraderM.presentation.exception.customExceptions.WrongAuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthUseCaseImpl implements AuthUseCase {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthResDto register(AuthRegisterReqDto request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new WrongAuthException("Username already taken");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .twoFactorAuth(false)
                .role("ROLE_USER")
                .build();

        user = userRepository.save(user);
        String token = jwtService.generateToken(user);

        return new AuthResDto(user.getId() ,user.getUsername(), token, user.getRole(), null, user.isTwoFactorAuth());
    }

    public AuthResDto login(AuthReqLoginDto request) {
        Optional<User> userOptional = userRepository.findByUsername(request.username());

        if (userOptional.isEmpty() || !passwordEncoder.matches(request.password(), userOptional.get().getPassword())) {
            throw new WrongAuthException("Invalid username or password");
        }

        User user = userOptional.get();
        String token = jwtService.generateToken(user);

        return new AuthResDto( user.getId() , user.getUsername(), token, user.getRole(), null, user.isTwoFactorAuth());
    }
}
