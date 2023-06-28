package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.service.QuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quests")
@CrossOrigin
public class QuestController {
    @Autowired
    private QuestService questService;

    @GetMapping("/getAll")
    public List<Quests> getAllQuests() {
        return questService.getQuests();
    }
}
