package com.TraderM.TraderM.application.usecase.Impl;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.TraderM.TraderM.application.usecase.AuthUseCase;
import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.infastructure.service.JwtService;
import com.TraderM.TraderM.presentation.dto.request.AuthRegisterReqDto;
import com.TraderM.TraderM.presentation.dto.response.AuthResDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

public class AuthUseCaseImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthUseCase authService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister_WhenUserDoesNotExist_ShouldRegisterAndReturnAuthResDto() {
        // Arrange
        AuthRegisterReqDto request = new AuthRegisterReqDto("testUser", "password" , false);
        when(userRepository.findByUsername(request.username())).thenReturn(Optional.empty());
        User savedUser =  User.builder()
                .username("testUser")
                .password("encodedPassword")
                .twoFactorAuth(false)
                .role("ROLE_USER")
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtService.generateToken(any(User.class))).thenReturn("jwt_token");
        when(passwordEncoder.encode(request.password())).thenReturn("encodedPassword");

        // Act
        AuthResDto response = authService.register(request);

        // Assert
        assertNotNull(response);
        assertEquals("testUser", response.username());
        assertEquals("jwt_token", response.token());
        assertEquals("ROLE_USER", response.role());
        assertFalse(response.isTwoFactorEnabled());
    }

    @Test
    public void testRegister_WhenUserAlreadyExists_ShouldReturnBadRequest() {
        // Arrange
        AuthRegisterReqDto request = new AuthRegisterReqDto("testUser", "password" , false);
        when(userRepository.findByUsername(request.username())).thenReturn(Optional.of(new User()));
        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> authService.register(request));
    }
}
