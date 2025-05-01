package com.TraderM.TraderM.presentation.dto.response;

import java.util.List;

public record StatsResDto(
        long coinsCount,
        List<CoinResDto> coins,
        long transactionsCount,
        double totalTransactionsVolume
) {
}
