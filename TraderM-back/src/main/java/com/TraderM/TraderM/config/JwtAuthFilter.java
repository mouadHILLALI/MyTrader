package com.TraderM.TraderM.config;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final String secretKey;

    @Override
    public void doFilterInternal(HttpServletRequest req, 
    HttpServletResponse res,
     FilterChain filter) throws ServletException,IOException
    {
        
    }
}