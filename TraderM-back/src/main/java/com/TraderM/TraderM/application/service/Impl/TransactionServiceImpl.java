package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.domain.model.Transaction;
import com.TraderM.TraderM.domain.repository.CoinRepository;
import com.TraderM.TraderM.domain.repository.TransactionRepository;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoUserWasFound;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class TransactionServiceImpl implements TransactionService {
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public TransactionResDto executeTransaction(TransactionReqDto transactionReqDto) {
        Transaction transaction = Transaction.builder()
                .amount(transactionReqDto.amount())
                .status("PENDING")
                .coin(coinRepository.findById(transactionReqDto.coinId()).orElseThrow(()->new NoCoinWasFoundException("Coin Not Found")))
                .buyer(userRepository.findById(transactionReqDto.buyerId()).orElseThrow(()-> new NoUserWasFound("No buyer was found")))
                .seller(coinRepository.findById(transactionReqDto.coinId()).orElseThrow(()->new NoCoinWasFoundException("Coin Not Found")).getOwner())
                .build();
        transaction = transactionRepository.save(transaction);
        return new TransactionResDto(transaction.getId() , transaction.getAmount(),transaction.getCoin(),transaction.getBuyer(),transaction.getSeller() ,transaction.getStatus());
    }

    @Override
    public TransactionResDto validateTransaction() {
        return null;
    }
}
