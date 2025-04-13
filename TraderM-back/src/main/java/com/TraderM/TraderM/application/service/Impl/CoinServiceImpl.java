package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.CoinRepository;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.presentation.dto.request.CoinReqDto;
import com.TraderM.TraderM.presentation.dto.request.UpdateCoinReqDto;
import com.TraderM.TraderM.presentation.dto.response.CoinResDto;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoUserWasFound;
import com.TraderM.TraderM.presentation.exception.customExceptions.SymbolAlreadyExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public CoinResDto addCoin(UUID userId, CoinReqDto coin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoUserWasFound("User not found"));
        Coin newCoin = Coin.builder()
                .name(coin.name())
                .price(coin.price())
                .symbol(isSymbolUnique(coin.symbol()))
                .build();
        newCoin.setOwner(user);
        newCoin.setSupply(coin.supply());
        newCoin = coinRepository.save(newCoin);
        return new CoinResDto(newCoin.getId() , newCoin.getName() , newCoin.getSymbol() , newCoin.getPrice() , newCoin.getSupply());
    }

    @Transactional
    @Override
    public void deleteCoin(UUID coin) {
        Coin existingCoin = coinRepository.findById(coin)
                .orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));
        coinRepository.delete(existingCoin);
    }

    @Override
    public List<CoinResDto> getCoins() {
        return coinRepository.findAll().stream().map(coin -> new CoinResDto(coin.getId() , coin.getName() , coin.getSymbol(), coin.getPrice() , coin.getSupply())).toList();
    }

    @Override
    public CoinResDto getCoinById(UUID coinId) {
        Coin coin = coinRepository.findById(coinId).orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));
        return new CoinResDto(coin.getId() , coin.getName() , coin.getSymbol(), coin.getPrice() , coin.getSupply());
    }

    @Override
    public List<CoinResDto> getCoinsByOwnerId(UUID ownerId) {
        return coinRepository.findByOwnerId(ownerId).stream().map(coin -> new CoinResDto(coin.getId(),coin.getName(),coin.getSymbol(),coin.getPrice(),coin.getSupply())).toList();
    }

    @Transactional
    @Override
    public CoinResDto updateCoin(UpdateCoinReqDto coin, UUID ownerId) {
        Coin existingCoin = coinRepository.findById(coin.id())
                .orElseThrow(() -> new NoCoinWasFoundException("Coin not found"));

        existingCoin.setOwner(findUserById(ownerId));
        existingCoin.setSupply(coin.supply());
        existingCoin.setName(coin.name());
        existingCoin = coinRepository.save(existingCoin);
        return new CoinResDto(existingCoin.getId() , existingCoin.getName() , existingCoin.getSymbol() , existingCoin.getPrice() , existingCoin.getSupply());
    }


    private User findUserById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoUserWasFound("User not found"));
    }

    private String isSymbolUnique(String symbol) {
        if (coinRepository.findBySymbol(symbol) != null) throw new SymbolAlreadyExistException("symbol already exist");
        return symbol;
    }
}
