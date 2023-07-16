package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.model.Armour;
import com.daniel.monster_hunter.monster_hunter.repository.ArmourRepository;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/getAll")
    public List<Armour> getAllArmour() {
        return armourRepository.findAll();
    }

    @GetMapping("/{armourId}")
    public Optional<Armour> getArmourById(@PathVariable(value = "armourId") Long armourId) {
        return armourRepository.findById(armourId);
    }

}
