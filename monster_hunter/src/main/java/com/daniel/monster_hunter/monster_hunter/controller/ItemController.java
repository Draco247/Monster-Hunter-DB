package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import com.daniel.monster_hunter.monster_hunter.model.Armour;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import com.daniel.monster_hunter.monster_hunter.repository.ArmourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/items")
@CrossOrigin
public class ItemController {
    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private WeaponRepository weaponRepository;

    @Autowired
    private ArmourRepository armourRepository;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/getAll")
    public List<Items> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{itemId}")
    public Optional<Items> getItemById(@PathVariable(value = "itemId") Long itemId) {
        return itemRepository.findById(itemId);
    }

    @GetMapping("/item_type/{itemtype}")
    public List<Items> getItemByItemtype(@PathVariable(value = "itemtype") String itemtype) {
        return itemRepository.findItemsByItemtype(itemtype);
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

    @GetMapping("/{itemId}/armour")
    public ResponseEntity<List<Armour>> getAllArmourByItemId(@PathVariable(value = "itemId") Long itemId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Armour> armour = armourRepository.findByArmourforgingId(itemId);
        return new ResponseEntity<>(armour, HttpStatus.OK);
    }


}
