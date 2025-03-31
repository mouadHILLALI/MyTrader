package com.TraderM.TraderM.presentation.dto.response;

import java.util.UUID;

public record CoinResDto(
        UUID id ,
        String name ,
        String symbol ,
        double price ,
        long supply
) {
}
