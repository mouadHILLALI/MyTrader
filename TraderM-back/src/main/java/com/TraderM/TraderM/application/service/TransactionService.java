package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Transaction;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    TransactionResDto executeTransaction(TransactionReqDto transactionReqDto);
    TransactionResDto validateTransaction(UUID transactionId);
    List<TransactionResDto> fetchTransactionsBySeller(UUID sellerId);
    long getTransactionCountByCoinId(UUID coinId);
    TransactionResDto cancelTransaction(UUID transactionId);
    long getAllTransactionCount();
    List<TransactionResDto> fetchAllTransactions();
}
