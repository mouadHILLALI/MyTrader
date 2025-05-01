package com.TraderM.TraderM.infastructure.config;

import com.TraderM.TraderM.infastructure.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RequiredArgsConstructor
public class JwtHandShakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        // Try to get token from headers first
        String token = request.getHeaders().getFirst("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            // Fallback to query parameter
            String query = request.getURI().getQuery();
            if (query != null) {
                String[] params = query.split("&");
                for (String param : params) {
                    if (param.startsWith("token=")) {
                        token = "Bearer " + URLDecoder.decode(param.substring(6), StandardCharsets.UTF_8);
                        break;
                    }
                }
            }
        }

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                if (jwtService.isTokenExpired(token)) {
                    String username = jwtService.extractUsername(token);
                    attributes.put("username", username);
                    return true;
                }
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
    }
}
