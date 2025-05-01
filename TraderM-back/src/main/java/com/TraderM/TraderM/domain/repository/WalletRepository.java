package com.TraderM.TraderM.domain.repository;

import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {

    @Query(value = "SELECT * FROM wallets WHERE owner_id = :ownerId LIMIT 1", nativeQuery = true)
    Wallet findByOwnerId(@Param("ownerId") UUID ownerId);
}
