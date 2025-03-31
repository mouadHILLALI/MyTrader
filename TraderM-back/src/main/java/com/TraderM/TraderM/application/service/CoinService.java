package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Coin;

import java.util.UUID;

public interface CoinService {
     Coin addCoin(UUID userId, Coin coin);
     Coin updateCoin(Coin coin , UUID ownerId);
     void deleteCoin(UUID coin);
}
