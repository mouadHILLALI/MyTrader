package com.TraderM.TraderM.infastructure.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       return http.csrf(crsf -> crsf.disable()).authorizeHttpRequests(
        auth -> auth.requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/users/**").hasAnyAuthority("ROLE_USER")
        .anyRequest().authenticated()
       ).addFilterBefore(new JwtAuthFilter(userDetailsService), AuthorizationFilter.class).build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
