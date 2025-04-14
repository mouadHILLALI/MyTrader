package com.TraderM.TraderM.domain.repository;

import com.TraderM.TraderM.domain.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CoinRepository extends JpaRepository<Coin, UUID> {
    Coin findBySymbol(String symbol);
    List<Coin> findByOwnerId(UUID ownerId);

    @Query(value = "SELECT * FROM coins WHERE owner_id <> :ownerId", nativeQuery = true)
    List<Coin> findCoinsToSell(@Param("ownerId") UUID ownerId);

}
