package com.TraderM.TraderM.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UpdateCoinReqDto(
        @NotNull UUID id,
        @NotBlank String name ,
        @NotNull long supply
) {
}
