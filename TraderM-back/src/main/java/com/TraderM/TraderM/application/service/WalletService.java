package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Wallet;

import java.util.UUID;

public interface WalletService {
    Wallet saveToWallet(Wallet wallet);
    Wallet createWallet(Wallet wallet);
    Wallet getWalletByOwnerId(UUID ownerId);
}
