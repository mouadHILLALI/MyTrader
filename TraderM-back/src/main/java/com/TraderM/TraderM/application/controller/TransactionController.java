package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/execute")
    public TransactionResDto executeTransaction(@RequestBody @Valid TransactionReqDto transaction) {
        return transactionService.executeTransaction(transaction);
    }

    @GetMapping("/getAllTransactions/{sellerId}")
    public List<TransactionResDto> fetchAllTransactions(@PathVariable UUID sellerId) {
        return transactionService.fetchTransactionsBySeller(sellerId);
    }
}
