package com.TraderM.TraderM.domain.model;

import com.TraderM.TraderM.presentation.exception.customExceptions.InvalidTransactionAmount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "transactions")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private long amount;
    @OneToOne(cascade = CascadeType.ALL)
    private User buyer;
    @OneToOne(cascade = CascadeType.ALL)
    private User seller;
    @OneToOne(cascade = CascadeType.ALL)
    private Coin coin;
    private String status;

    public void setAmount(long amount) {
        if (amount < 0) {
            throw new InvalidTransactionAmount("Amount cannot be negative");
        }
        this.amount = amount;
    }
    public void setBuyerId(User buyerId) {
        this.buyer = buyerId;
    }
    public void setSellerId(User sellerId) {
        this.seller = sellerId;
    }
    public void setCoin(Coin coin) {
        this.coin = coin;
    }
}
