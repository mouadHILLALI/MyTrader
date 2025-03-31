package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.domain.model.Coin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/coins")
@RequiredArgsConstructor
public class CoinController {
    private final CoinService coinService;


    @PostMapping("/addCoin/{userId}")
    public ResponseEntity<Coin> addCoin(@PathVariable UUID userId, @RequestBody Coin coin) {
        return ResponseEntity.ok(coinService.addCoin(userId, coin));
    }

    @DeleteMapping("/deleteCoin/{coinId}")
    public ResponseEntity<String> removeCoin(@PathVariable UUID coinId) {
        coinService.deleteCoin(coinId);
        return ResponseEntity.ok("Coin removed successfully");
    }

    @PutMapping("/updateCoin/{ownerId}")
    public ResponseEntity<Coin> updateCoinPrice(@RequestBody Coin coin , @PathVariable UUID ownerId) {
        System.out.println("im here");
        return ResponseEntity.ok(coinService.updateCoin(coin,ownerId));
    }


}
