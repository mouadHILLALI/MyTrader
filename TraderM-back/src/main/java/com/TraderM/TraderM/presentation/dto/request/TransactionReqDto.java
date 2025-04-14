package com.TraderM.TraderM.presentation.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TransactionReqDto(
       @NotNull long amount ,
       @NotNull UUID coinId,
       @NotNull UUID buyerId
) {
}
