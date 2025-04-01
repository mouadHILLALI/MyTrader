package com.TraderM.TraderM.presentation.dto.response;

import java.util.List;
import java.util.UUID;

public record AuthResDto(
        UUID userId,
        String username ,
        String token ,
        String role ,
        List<String> authorities,
        boolean isTwoFactorEnabled
) {
}
