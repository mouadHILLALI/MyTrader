package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.presentation.dto.request.CoinReqDto;
import com.TraderM.TraderM.presentation.dto.request.UpdateCoinReqDto;
import com.TraderM.TraderM.presentation.dto.response.CoinResDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/coins")
@RequiredArgsConstructor
public class CoinController {
    private final CoinService coinService;


    @PostMapping("/addCoin/{userId}")
    public ResponseEntity<CoinResDto> addCoin(@PathVariable UUID userId, @RequestBody @Valid CoinReqDto coin) {
        return ResponseEntity.ok(coinService.addCoin(userId, coin));
    }

    @DeleteMapping("/deleteCoin/{coinId}")
    public ResponseEntity<String> removeCoin(@PathVariable UUID coinId) {
        coinService.deleteCoin(coinId);
        return ResponseEntity.ok("Coin removed successfully");
    }

    @PutMapping("/updateCoin/{ownerId}")
    public ResponseEntity<CoinResDto> updateCoinPrice(@RequestBody @Valid UpdateCoinReqDto coin , @PathVariable UUID ownerId) {
        System.out.println("im here");
        return ResponseEntity.ok(coinService.updateCoin(coin,ownerId));
    }

    @GetMapping("/allCoins")
    public ResponseEntity<List<CoinResDto>> getAllCoins() {
        return ResponseEntity.ok(coinService.getCoins());
    }

    @GetMapping("/getCoin/{coinId}")
    public ResponseEntity<CoinResDto> getCoinById(@PathVariable UUID coinId) {
        return ResponseEntity.ok(coinService.getCoinById(coinId));
    }
}
