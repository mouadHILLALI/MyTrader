package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.presentation.dto.request.CoinReqDto;
import com.TraderM.TraderM.presentation.dto.request.UpdateCoinReqDto;
import com.TraderM.TraderM.presentation.dto.response.CoinResDto;

import java.util.UUID;

public interface CoinService {
     CoinResDto addCoin(UUID userId, CoinReqDto coin);
     CoinResDto updateCoin(UpdateCoinReqDto coin , UUID ownerId);
     void deleteCoin(UUID coin);
}
