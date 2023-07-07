package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import com.daniel.monster_hunter.monster_hunter.service.QuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/quests")
@CrossOrigin
public class QuestController {
    @Autowired
    private QuestService questService;

    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private QuestRepository questRepository;

    @GetMapping("/getAll")
    public List<Quests> getAllQuests() {
        return questRepository.findAll();
    }
//    public List<Quests> getAllQuests() {
//        return questService.getQuests();
//    }

    @GetMapping("/{questId}/monsters")
    public ResponseEntity<List<Monsters>> getAllMonstersByQuestId(@PathVariable(value = "questId") Long questId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Monsters> monsters = monsterRepository.findMonstersByQuestsId(questId);
        return new ResponseEntity<>(monsters, HttpStatus.OK);
    }

    @GetMapping("/{questId}/mini_crown")
    public List<Map<String, Object>> getQuestMini_Crown(@PathVariable Long questId) {
        return questService.getQuestMini_Crown(questId);
    }

    @GetMapping("/{questId}/king_crown")
    public List<Map<String, Object>> getQuestKing_Crown(@PathVariable Long questId) {
        return questService.getQuestKing_Crown(questId);
    }

    @GetMapping("/{questId}/rewards")
    public List<Map<String, Object>> getQuestRewards(@PathVariable Long questId) {
        return questService.getQuestRewards(questId);
    }
}
