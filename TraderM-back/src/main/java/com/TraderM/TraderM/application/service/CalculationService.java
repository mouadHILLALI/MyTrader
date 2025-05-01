package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Coin;

import java.util.UUID;

public interface CalculationService {
    void recalculateCoinPrice(UUID coinId);
    void recalculateCoinSupply(UUID coinId , long supply);
    void recalculateCoinPriceBasedOnSupply(Coin coin, long supply);
}
