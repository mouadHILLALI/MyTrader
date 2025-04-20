package com.TraderM.TraderM.application.service.Impl;

import com.TraderM.TraderM.application.service.CoinService;
import com.TraderM.TraderM.application.service.TransactionService;
import com.TraderM.TraderM.domain.model.Coin;
import com.TraderM.TraderM.domain.model.Transaction;
import com.TraderM.TraderM.domain.model.User;
import com.TraderM.TraderM.domain.repository.CoinRepository;
import com.TraderM.TraderM.domain.repository.TransactionRepository;
import com.TraderM.TraderM.domain.repository.UserRepository;
import com.TraderM.TraderM.presentation.dto.request.TransactionReqDto;
import com.TraderM.TraderM.presentation.dto.response.CoinResDto;
import com.TraderM.TraderM.presentation.dto.response.TransactionResDto;
import com.TraderM.TraderM.presentation.dto.response.UserResDto;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoCoinWasFoundException;
import com.TraderM.TraderM.presentation.exception.customExceptions.NoUserWasFound;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log4j2
public class TransactionServiceImpl implements TransactionService {
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    @Override
    @Transactional
    public TransactionResDto executeTransaction(TransactionReqDto transactionReqDto) {
        Transaction transaction = Transaction.builder()
                .amount(transactionReqDto.amount())
                .status("PENDING")
                .coin(coinRepository.findById(transactionReqDto.coinId()).orElseThrow(()->new NoCoinWasFoundException("Coin Not Found")))
                .buyer(userRepository.findById(transactionReqDto.buyerId()).orElseThrow(()-> new NoUserWasFound("No buyer was found")))
                .seller(userRepository.findByUserByCoin(transactionReqDto.coinId()).orElseThrow(()->new NoUserWasFound("seller Not Found")))
                .build();
        transaction = transactionRepository.save(transaction);
        return new TransactionResDto(transaction.getId() , transaction.getAmount(),toCoinRes(transaction.getCoin()),toUserResDto(transaction.getBuyer()), toUserResDto(transaction.getSeller()),transaction.getStatus());
    }

    @Override
    public TransactionResDto validateTransaction() {
        return null;
    }

    @Override
    public List<TransactionResDto> fetchTransactionsBySeller(UUID sellerId) {
        return transactionRepository.findAll().stream().filter(transaction -> transaction.getSeller().getId().equals(sellerId) )
        .map(transaction -> new TransactionResDto(transaction.getId(), transaction.getAmount(),toCoinRes(transaction.getCoin()),toUserResDto(transaction.getBuyer()), toUserResDto(transaction.getSeller()),transaction.getStatus() ) ).toList();
    }

    private UserResDto toUserResDto(User user) {
        return new UserResDto(user.getId() , user.getUsername());
    }
    private CoinResDto toCoinRes(Coin coin) {
        return new CoinResDto(coin.getId() , coin.getName() , coin.getSymbol() , coin.getPrice() , coin.getSupply());
    }

}
