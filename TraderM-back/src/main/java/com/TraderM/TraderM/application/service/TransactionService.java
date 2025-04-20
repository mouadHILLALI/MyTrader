package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.domain.model.Transaction;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    TransactionResDto executeTransaction(TransactionReqDto transactionReqDto);
    TransactionResDto validateTransaction();
    List<TransactionResDto> fetchTransactionsBySeller(UUID sellerId);
}
