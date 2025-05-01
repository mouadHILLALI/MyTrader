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

    @PutMapping("/approveTransaction/{transactionId}")
    public TransactionResDto validateTransaction(@PathVariable UUID transactionId) {
        return transactionService.validateTransaction(transactionId);
    }

    @PutMapping("/cancelTransaction/{transactionId}")
    public TransactionResDto cancelTransaction(@PathVariable UUID transactionId) {
        return transactionService.cancelTransaction(transactionId);
    }
}
