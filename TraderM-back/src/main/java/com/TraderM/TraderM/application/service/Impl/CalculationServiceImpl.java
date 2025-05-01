package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.repository.CoinRepository;
import com.TraderM.TraderM.domain.repository.TransactionRepository;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CalculationServiceImpl implements com.TraderM.TraderM.application.service.CalculationService {
    private final CoinRepository coinRepository;
    private final TransactionRepository transactionRepository;
    @Override
    @Transactional
    public void recalculateCoinPrice(UUID coinId) {
        Coin coin = coinRepository.findById(coinId).orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));
        long transactionCount = transactionRepository.countByCoinId(coinId);
        double newPrice = ((coin.getPrice() * coin.getSupply()) / coin.getSupply()) * getTransactionCoefficient(transactionCount , coin.getPrice());
        coin.setPrice(newPrice);
        coinRepository.save(coin);
    }

    private double getTransactionCoefficient(long transactionCount, double coinPrice) {
        if (transactionCount < 1) return 1;
        return 1 + (transactionCount * 0.01);
    }

    @Override
    public void recalculateCoinSupply(UUID coinId, long transactionCount) {
        Coin coin = coinRepository.findById(coinId).orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));
        coin.setSupply(coin.getSupply() - transactionCount);
        coinRepository.save(coin);
    }

    @Override
    public void recalculateCoinPriceBasedOnSupply(Coin coin, long newSupply) {
        double newPrice = ((coin.getPrice() * coin.getSupply()) / newSupply);
        coin.setPrice(newPrice);
    }

}
