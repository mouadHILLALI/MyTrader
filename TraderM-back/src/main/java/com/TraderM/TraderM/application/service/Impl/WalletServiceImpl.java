package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.WalletService;
import com.TraderM.TraderM.domain.model.Wallet;
import com.TraderM.TraderM.domain.repository.WalletRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {
    private final WalletRepository walletRepository;
    @Override
    public Wallet saveToWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet createWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    @Override
    @Transactional
    public Wallet getWalletByOwnerId(UUID ownerId) {
        return walletRepository.findByOwnerId(ownerId);
    }
}
