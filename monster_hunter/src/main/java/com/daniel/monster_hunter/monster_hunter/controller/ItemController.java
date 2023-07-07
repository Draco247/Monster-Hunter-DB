package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@CrossOrigin
public class ItemController {
    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private WeaponRepository weaponRepository;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/getAll")
    public List<Items> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{itemId}/monsters")
    public ResponseEntity<List<Monsters>> getAllMonstersByItemId(@PathVariable(value = "itemId") Long itemId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Monsters> monsters = monsterRepository.findMonstersByItemsId(itemId);
        return new ResponseEntity<>(monsters, HttpStatus.OK);
    }

    @GetMapping("/{itemId}/weapons_forging")
    public ResponseEntity<List<Weapons>> getAllWeaponsForgingByItemId(@PathVariable(value = "itemId") Long itemId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Weapons> weapons = weaponRepository.findWeaponsByForgingId(itemId);
        return new ResponseEntity<>(weapons, HttpStatus.OK);
    }

    @GetMapping("/{itemId}/weapons_upgrade")
    public ResponseEntity<List<Weapons>> getAllWeaponsUpgradeByItemId(@PathVariable(value = "itemId") Long itemId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Weapons> weapons = weaponRepository.findWeaponsByUpgradeId(itemId);
        return new ResponseEntity<>(weapons, HttpStatus.OK);
    }


}
