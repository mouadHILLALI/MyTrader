package com.TraderM.TraderM.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AuthRegisterReqDto(
        @NotNull @NotEmpty @NotBlank(message = "Username is required") String username ,
        @Size(min = 6, message = "Password must be at least 6 characters") String password ,
        boolean twoFactorAuth
) {
}
