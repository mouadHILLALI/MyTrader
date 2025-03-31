package com.TraderM.TraderM.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "coins")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Coin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String symbol;
    private double price;
    private long supply;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    private User owner;

    public void updatePrice(double newPrice) {
        this.price = newPrice;
    }

    protected void setOwner(User owner) {
        this.owner = owner;
    }
}
