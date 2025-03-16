package com.TraderM.TraderM.presentation.dto.response;

import java.util.List;

public record AuthResDto(
        String username ,
        String token ,
        String role ,
        List<String> authorities,
        boolean isTwoFactorEnabled
) {
}
