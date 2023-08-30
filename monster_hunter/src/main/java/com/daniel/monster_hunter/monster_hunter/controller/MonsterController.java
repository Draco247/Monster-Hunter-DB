package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.dto.MonsterDTO;
import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import com.daniel.monster_hunter.monster_hunter.service.MonsterService;
import com.daniel.monster_hunter.monster_hunter.service.WeaponService;
import com.daniel.monster_hunter.monster_hunter.service.ArmourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/v1/monsters")
@CrossOrigin
public class MonsterController {
    @Autowired
    private MonsterService monsterService;

    @Autowired
    private ArmourService armourService;

    @Autowired
    private WeaponService weaponService;

    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private QuestRepository questRepository;

    @GetMapping("/getAll")
    public List<MonsterDTO> getAllMonsters() {
        return monsterRepository.findAllBy();
    }
    // public List<Monsters> getAllMonsters() {
    //     return monsterRepository.findAll();
    // }

    @GetMapping("/{monsterId}")
    public Optional<Monsters> getMonsterById(@PathVariable(value = "monsterId") Long monsterId) {
        return monsterRepository.findById(monsterId);
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

    @GetMapping("/{monsterId}/hitzones")
    public List<Map<String, Object>> getMonsterHitzones(@PathVariable Long monsterId) {
        return monsterService.getMonsterHitzones(monsterId);
    }

    @GetMapping("/{monsterId}/drops")
    public List<Map<String, Object>> getMonsterDrops(@PathVariable Long monsterId) {
        return monsterService.getMonsterDrops(monsterId);
    }

    @GetMapping("/{monsterId}/forging-weapons")
    public List<Map<String, Object>> getWeaponsForgingByMonsterId(@PathVariable Long monsterId) {
        return weaponService.getWeaponsForgingByMonsterId(monsterId);
    }

    @GetMapping("/{monsterId}/upgrade-weapons")
    public List<Map<String, Object>> getWeaponsUpgradeByMonsterId(@PathVariable Long monsterId) {
        return weaponService.getWeaponsUpgradeByMonsterId(monsterId);
    }

    @GetMapping("/{monsterId}/armour")
    public List<Map<String, Object>> getArmourByMonsterId(@PathVariable Long monsterId) {
        return armourService.getArmourForgingByMonsterId(monsterId);
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
