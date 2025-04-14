package com.TraderM.TraderM.presentation.dto.response;


import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.model.User;

import java.util.UUID;

public record TransactionResDto(
        UUID id ,
        long amount ,
        Coin coin,
        User buyer,
        User seller,
        String status
) {
}
