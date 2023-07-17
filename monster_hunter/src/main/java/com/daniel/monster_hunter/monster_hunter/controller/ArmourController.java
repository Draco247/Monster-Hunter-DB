package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.model.Armour;
import com.daniel.monster_hunter.monster_hunter.model.Skills;
import com.daniel.monster_hunter.monster_hunter.repository.ArmourRepository;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.SkillRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/armour")
@CrossOrigin
public class ArmourController {
    @Autowired
    private ArmourRepository armourRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/getAll")
    public List<Armour> getAllArmour() {
        return armourRepository.findAll();
    }

    @GetMapping("/{armourId}")
    public Optional<Armour> getArmourById(@PathVariable(value = "armourId") Long armourId) {
        return armourRepository.findById(armourId);
    }

    @GetMapping("/{armourId}/items")
    public ResponseEntity<List<Items>> getAllForgingItemsByArmourId(@PathVariable(value = "armourId") Long armourId) {
        List<Items> items = itemRepository.findItemsByArmourforgingId(armourId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/{armourId}/skills")
    public ResponseEntity<List<Skills>> getAllSkillsByArmourId(@PathVariable(value = "armourId") Long armourId) {
        List<Skills> skills = skillRepository.findSkillsByArmourId(armourId);
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

}
