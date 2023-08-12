package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import com.daniel.monster_hunter.monster_hunter.service.MonsterService;
import com.daniel.monster_hunter.monster_hunter.service.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/weapons")
@CrossOrigin
public class WeaponController {
    @Autowired
    private WeaponRepository weaponRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private WeaponService weaponService;

    @GetMapping("/getAll")
    public List<Weapons> getAllWeapons() {
        return weaponRepository.findAll();
    }

    @GetMapping("/{weaponId}/weapon")
    public Optional<Weapons> getWeaponById(@PathVariable(value = "weaponId") Long weaponId) {
        return weaponRepository.findById(weaponId);
    }

    @GetMapping("/{typeId}/weapons")
    public List<Weapons> getWeaponsByType(@PathVariable("typeId") Long typeId) {
        return weaponRepository.findByWeapontypeid(typeId);
    }

    @GetMapping
    public List<Weapons> getWeaponsByElement(@RequestParam(value="element") String element) {
        return weaponRepository.findByElement(element);
    }

    @GetMapping("/{typeId}/weapons/element")
    public List<Weapons> getWeaponsByTypeAndElement(@PathVariable Long typeId,
                                                    @RequestParam(value = "element", required = false) String element) {
        return weaponRepository.findByWeapontypeidAndElement(typeId, element);
    }

    @GetMapping("/{weaponId}/items")
    public ResponseEntity<List<Items>> getAllForgingItemsByWeaponId(@PathVariable(value = "weaponId") Long weaponId) {
//        if (!questRepository.existsById(questId)) {
//            throw new ResourceNotFoundException("Not found Tag  with id = " + questId);
//        }

        List<Items> items = itemRepository.findItemsByForgingId(weaponId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


}
