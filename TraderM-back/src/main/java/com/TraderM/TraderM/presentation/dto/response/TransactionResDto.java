package com.TraderM.TraderM.presentation.dto.response;


import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.model.User;

import java.util.UUID;

public record TransactionResDto(
        UUID id ,
        long amount ,
        CoinResDto coin,
        UserResDto buyer,
        UserResDto seller,
        String status
) {
}
