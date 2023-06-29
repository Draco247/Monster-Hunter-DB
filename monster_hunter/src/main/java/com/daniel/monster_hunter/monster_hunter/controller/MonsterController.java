package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import com.daniel.monster_hunter.monster_hunter.service.MonsterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/monsters")
@CrossOrigin
public class MonsterController {
//    @Autowired
//    private MonsterService monsterService;

    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private QuestRepository questRepository;

    @GetMapping("/getAll")
    public List<Monsters> getAllMonsters() {
        return monsterRepository.findAll();
    }

    @GetMapping("/{monsterId}/quests")
    public ResponseEntity<List<Quests>> getAllQuestsByMonsterId(@PathVariable(value = "monsterId") Long monsterId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Quests> quests = questRepository.findQuestsByMonstersId(monsterId);
        return new ResponseEntity<>(quests, HttpStatus.OK);
    }

    @GetMapping("/{monsterId}/items")
    public ResponseEntity<List<Items>> getAllItemsByMonsterId(@PathVariable(value = "monsterId") Long monsterId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Items> items = itemRepository.findItemsByMonstersId(monsterId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
//    public List<Monsters> getAllMonsters() {
//        return monsterService.getMonsters();
//    }

//    @GetMapping("/{monster_id}/quests")
//    public List<Quests> getQuestsForMonster(@PathVariable Long monster_id) {
//        Monsters monsters = monsterRepository.findById(monster_id);
//        if (monsters != null) {
//            List<Quests_Monsters> questMonsters = monsters.getQuestMonsters();
//            return questMonsters.stream()
//                    .map(Quests_Monsters::getQuests)
//                    .collect(Collectors.toList());
//        }
//        return Collections.emptyList();
//    }

}
