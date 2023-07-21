package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.SkillDecorations;
import com.daniel.monster_hunter.monster_hunter.repository.SkillDecorationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SkillDecorationServiceImpl implements SkillDecorationService {

    @Autowired
    private SkillDecorationRepository skillDecorationRepository;

    public List<SkillDecorations> getDecorationsForSkill(Long skillId) {
        return skillDecorationRepository.findBySkillsId(skillId);
    }

}
