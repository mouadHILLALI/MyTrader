package com.TraderM.TraderM.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CoinReqDto(
        @NotBlank(message = "name cannot be empty") String name ,
        @NotBlank(message = "symbol cannot be empty") String symbol ,
        @NotNull double price,
        @NotNull long supply
) {
}
