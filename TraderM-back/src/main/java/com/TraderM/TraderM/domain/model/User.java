package com.TraderM.TraderM.domain.model;

import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import com.TraderM.TraderM.presentation.exception.customExceptions.SymbolAlreadyExistException;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String username;
    private String password;
    private boolean twoFactorAuth;
    private String role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Coin> coins = new HashSet<>();

    public void addCoin(Coin coin) {
        if (this.coins.stream().anyMatch(c -> c.getSymbol().equals(coin.getSymbol()))) throw new SymbolAlreadyExistException("this symbol already exist");
        coin.setOwner(this);
        this.coins.add(coin);
    }

    public void removeCoin(UUID coinId) {
        this.coins.removeIf(coin -> coin.getId().equals(coinId));
    }

    public void updateCoinPrice(String symbol, double newPrice) {
        this.coins.stream()
                .filter(coin -> coin.getSymbol().equals(symbol))
                .findFirst()
                .orElseThrow(() -> new NoCoinWasFoundException("Coin not found"))
                .updatePrice(newPrice);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
