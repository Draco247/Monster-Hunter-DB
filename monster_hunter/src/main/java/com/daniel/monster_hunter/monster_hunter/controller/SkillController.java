package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.dto.SkillsDTO;
import com.daniel.monster_hunter.monster_hunter.model.SkillDecorations;
import com.daniel.monster_hunter.monster_hunter.model.Skills;
import com.daniel.monster_hunter.monster_hunter.repository.SkillDecorationRepository;
import com.daniel.monster_hunter.monster_hunter.repository.SkillRepository;
import com.daniel.monster_hunter.monster_hunter.service.SkillDecorationService;
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

    @Autowired
    private SkillDecorationService skillDecorationService;

    @Autowired
    private SkillDecorationRepository skillDecorationRepository;

    @GetMapping("/getAll")
    public List<SkillsDTO> getAllSkills() {
        return skillRepository.findAllBy();
    }
    // public List<Skills> getAllSkills() {
    //     return skillRepository.findAll();
    // }

    @GetMapping("/{skillId}")
    public Optional<Skills> getSkillById(@PathVariable(value = "skillId") Long skillId) {
        return skillRepository.findById(skillId);
    }

    @GetMapping("/skillDecorations/getAll")
    public List<SkillDecorations> getAllSkillDecorations() {
        return skillDecorationRepository.findAll();
    }

    @GetMapping("/skillDecorations/{skillDecorationSetId}")
    public Optional<SkillDecorations> getSkillDecorationById(@PathVariable(value = "skillDecorationSetId") Long skillDecorationId) {
        return skillDecorationRepository.findById(skillDecorationId);
    }

    @GetMapping("/skillDecorations/skills/{skillId}")
    public List<SkillDecorations> getDecorationsBySkillById(@PathVariable(value = "skillId") Long skillId) {
        return skillDecorationService.getDecorationsForSkill(skillId);
    }
}
