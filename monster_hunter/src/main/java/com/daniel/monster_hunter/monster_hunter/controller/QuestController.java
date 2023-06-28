package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quests")
@CrossOrigin
public class QuestController {
//    @Autowired
//    private QuestService questService;

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
//    public List<Monsters> getMonstersForQuest(Long quest_id) {
//        Quests quests = questRepository.findById(quest_id);
//        if (quests != null) {
//            List<Quests_Monsters> questMonsters = quests.getQuestMonsters();
//            return questMonsters.stream()
//                    .map(Quests_Monsters::getMonsters)
//                    .collect(Collectors.toList());
//        }
//        return Collections.emptyList();
//    }

//    public List<Monsters> getAllMonstersByQuestId(@PathVariable(value = "quest_id") Long quest_id) {
////        if (!questRepository.existsById(Math.toIntExact(quest_id))) {
////            throw new ResourceNotFoundException("Not found Tag  with id = " + tagId);
////        }
//
//        List<Monsters> monsters = MonsterRepository.findMonstersByQuestsId(quest_id);
//        return monsters;
//    }
}
