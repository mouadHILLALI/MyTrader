package com.TraderM.TraderM.domain.repository;

import com.TraderM.TraderM.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE id = (SELECT owner_id FROM coins WHERE id=:coinId LIMIT 1)", nativeQuery = true)
    Optional <User> findByUserByCoin(@Param("coinId") UUID coinId);
}
