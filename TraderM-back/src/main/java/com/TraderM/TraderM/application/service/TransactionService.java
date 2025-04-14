package com.TraderM.TraderM.application.service;

import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;

public interface TransactionService {
    TransactionResDto executeTransaction(TransactionReqDto transactionReqDto);
    TransactionResDto validateTransaction();

}
