package com.TraderM.TraderM.application.usecase;

import com.TraderM.TraderM.presentation.dto.request.AuthRegisterReqDto;
import com.TraderM.TraderM.presentation.dto.request.AuthReqLoginDto;
import com.TraderM.TraderM.presentation.dto.response.AuthResDto;

public interface AuthUseCase {
    AuthResDto register(AuthRegisterReqDto request);
    AuthResDto login(AuthReqLoginDto request);
}
