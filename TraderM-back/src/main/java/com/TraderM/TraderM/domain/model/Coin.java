package com.TraderM.TraderM.domain.model;

import com.TraderM.TraderM.presentation.exception.customExceptions.SupplyCannotBeNegative;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "coins")
@Getter
@NoArgsConstructor
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

    public void setSupply(long supply) {
        if(supply < 0) throw new SupplyCannotBeNegative("supply cannot be negative");
        this.supply = supply;
    }

    public String setName(String name) {
        if (!name.isBlank()){
            this.name = name;
            return name;
        }
        return null;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
