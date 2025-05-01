package com.TraderM.TraderM.domain.repository;

import com.TraderM.TraderM.domain.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    @Query(value = "SELECT COUNT(*) FROM transactions WHERE coin_id = :coinId AND status = 'APPROVED'", nativeQuery = true)
    long countByCoinId(@Param("coinId") UUID coinId);
}
