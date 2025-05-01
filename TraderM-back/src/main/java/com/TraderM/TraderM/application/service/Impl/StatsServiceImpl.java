package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.presentation.dto.response.CoinResDto;
import com.TraderM.TraderM.presentation.dto.response.StatsResDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl {
    private final CoinService coinService;
    private final TransactionService transactionService;
    public StatsResDto calculateStats() {
        return new StatsResDto(calculateCoinsCount(), getCoins(), totalTransactions(),getTotalTransactionVolume());
    }

    private long calculateCoinsCount() {
        return coinService.getCoins().size();
    }

    private List<CoinResDto> getCoins() {
        return coinService.getCoins();
    }

    private long totalTransactions(){
        return transactionService.getAllTransactionCount();
    }

    private double getTotalTransactionVolume(){
        double totalTransactionVolume = 0;

        for (TransactionResDto transactionResDto : transactionService.fetchAllTransactions()) {
            totalTransactionVolume += transactionResDto.amount();
        }
        return totalTransactionVolume;
    }
}
