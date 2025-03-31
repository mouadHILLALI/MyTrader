package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.CoinRepository;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoUserWasFound;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public Coin addCoin(UUID userId, Coin coin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoUserWasFound("User not found"));
        coin.setOwner(user);
        return coinRepository.save(coin);
    }

    @Transactional
    @Override
    public void deleteCoin(UUID coin) {
        Coin existingCoin = coinRepository.findById(coin)
                .orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));
        coinRepository.delete(existingCoin);
    }

    @Transactional
    @Override
    public Coin updateCoin(Coin coin, UUID ownerId) {
        Coin existingCoin = coinRepository.findById(coin.getId())
                .orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));

        existingCoin.setOwner(findUserById(ownerId));
        existingCoin.updatePrice(coin.getPrice());
        return coinRepository.save(existingCoin);
    }


    private User findUserById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoUserWasFound("User not found"));
    }
}
