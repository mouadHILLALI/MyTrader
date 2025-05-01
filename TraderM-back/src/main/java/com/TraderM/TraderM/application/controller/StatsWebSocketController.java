package com.TraderM.TraderM.application.controller;

import com.TraderM.TraderM.application.service.Impl.StatsServiceImpl;
import com.TraderM.TraderM.presentation.dto.response.StatsResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class StatsWebSocketController {
    private final StatsServiceImpl statsService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/stats")
    @SendToUser("/queue/stats")
    public StatsResDto handleStats() {
        return statsService.calculateStats();
    }

    @Scheduled(fixedRate = 5000)
    public void sendPeriodicUpdates() {
        messagingTemplate.convertAndSend("/topic/live-stats", statsService.calculateStats());
    }

}