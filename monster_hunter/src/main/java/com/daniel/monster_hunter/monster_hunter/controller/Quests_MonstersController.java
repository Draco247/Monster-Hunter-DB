//package com.daniel.monster_hunter.monster_hunter.controller;
//
//import com.daniel.monster_hunter.monster_hunter.service.Quests_MonstersService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/api/v1/quest-monsters")
//@CrossOrigin
//public class Quests_MonstersController {
//    @Autowired
//    private Quests_MonstersService questMonsterService;
//
//    @GetMapping("/monsters-for-quest/{questId}")
//    public List<Long> getMonstersForQuest(@PathVariable Long questId) {
//        return questMonsterService.getMonstersForQuest(questId);
//    }
//}
//
