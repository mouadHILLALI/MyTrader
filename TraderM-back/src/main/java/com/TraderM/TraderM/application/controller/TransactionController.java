package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/execute")
    public TransactionResDto executeTransaction(@RequestBody @Valid TransactionReqDto transaction) {
        return transactionService.executeTransaction(transaction);
    }
}
