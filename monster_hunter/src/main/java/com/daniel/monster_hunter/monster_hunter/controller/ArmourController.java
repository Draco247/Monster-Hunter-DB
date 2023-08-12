package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.*;
import com.daniel.monster_hunter.monster_hunter.repository.*;
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
    private ArmourSetRepository armourSetRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/getAll")
    public List<Armour> getAllArmour() {
        return armourRepository.findAll();
    }

    @GetMapping("/getAllSets")
    public List<ArmourSets> getAllArmourSets() {
        return armourSetRepository.findAll();
    }

    @GetMapping("/{armourId}")
    public Optional<Armour> getArmourById(@PathVariable(value = "armourId") Long armourId) {
        return armourRepository.findById(armourId);
    }

    @GetMapping("/armourSets/{armourSetId}")
    public Optional<ArmourSets> getArmourSetById(@PathVariable(value = "armourSetId") Long armourSetId) {
        return armourSetRepository.findById(armourSetId);
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
