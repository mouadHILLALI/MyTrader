package com.TraderM.TraderM.presentation.dto.response;

import java.time.LocalDateTime;

public record ErrorRes(
            LocalDateTime timestamp,
            int status,
            String error,
            String path
) {
}
