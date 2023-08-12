package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.SkillDecorations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SkillDecorationService {
    public List<SkillDecorations> getDecorationsForSkill(Long skillId);
}
