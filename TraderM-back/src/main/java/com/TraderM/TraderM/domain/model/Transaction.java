package com.TraderM.TraderM.domain.model;

import com.TraderM.TraderM.presentation.exception.customExceptions.InvalidTransactionAmount;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Collections;
import java.util.List;
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
    @ManyToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonManagedReference("transaction-buyer")
    private User buyer;
    @ManyToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonManagedReference("transaction-seller")
    private User seller;
    @ManyToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JsonBackReference("transaction-coin")
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
    public void setStatus(String status) {
        this.status = status;
    }
}
