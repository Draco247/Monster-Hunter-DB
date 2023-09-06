package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.dto.WeaponDTO;
import com.daniel.monster_hunter.monster_hunter.model.SwitchSkills;
import com.daniel.monster_hunter.monster_hunter.repository.SwitchSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/switch-skills")
@CrossOrigin
public class SwitchSkillController {
    @Autowired
    private SwitchSkillRepository switchSkillRepository;


    @GetMapping("/getAll")
    public List<SwitchSkills> getAllSwitchSkills() {
        return switchSkillRepository.findAll();
    }

    @GetMapping("/{skillId}")
    public Optional<SwitchSkills> getSwitchSkillById(@PathVariable(value = "switchSkillId") Long switchSkillId) {
        return switchSkillRepository.findById(switchSkillId);
    }

    @GetMapping("/{weapontypeId}/switch-skills")
    public List<SwitchSkills> getWeaponsByType(@PathVariable("weapontypeId") Long weapontypeId) {
        return switchSkillRepository.findSwitchSkillsByWeapontypeid(weapontypeId);
    }
}
