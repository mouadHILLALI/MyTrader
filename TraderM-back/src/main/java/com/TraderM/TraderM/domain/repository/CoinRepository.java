package com.TraderM.TraderM.domain.repository;

import com.TraderM.TraderM.domain.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CoinRepository extends JpaRepository<Coin, UUID> {
    Coin findBySymbol(String symbol);
}
