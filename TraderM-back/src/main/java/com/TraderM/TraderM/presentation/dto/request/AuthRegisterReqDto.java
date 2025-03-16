package com.TraderM.TraderM.presentation.dto.request;

public record AuthRegisterReqDto(
        String username ,
        String password ,
        boolean twoFactorAuth
) {
}
