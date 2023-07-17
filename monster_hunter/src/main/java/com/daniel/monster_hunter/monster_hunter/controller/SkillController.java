package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Skills;
import com.daniel.monster_hunter.monster_hunter.repository.ArmourRepository;
import com.daniel.monster_hunter.monster_hunter.repository.ItemRepository;
import com.daniel.monster_hunter.monster_hunter.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/skills")
@CrossOrigin
public class SkillController {
    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/getAll")
    public List<Skills> getAllSkills() {
        return skillRepository.findAll();
    }

    @GetMapping("/{skillId}")
    public Optional<Skills> getSkillById(@PathVariable(value = "skillId") Long skillId) {
        return skillRepository.findById(skillId);
    }
}
