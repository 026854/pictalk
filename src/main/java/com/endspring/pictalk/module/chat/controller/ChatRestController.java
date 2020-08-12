package com.endspring.pictalk.module.chat.controller;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import com.endspring.pictalk.module.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class ChatRestController {
    @Autowired
    private ChatService chatService;
    @GetMapping("/test")
    public Flux<ChatRoom> test(){
        return chatService.readAll();
    }
}
