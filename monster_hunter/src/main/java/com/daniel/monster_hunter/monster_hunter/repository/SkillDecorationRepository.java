package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.SkillDecorations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillDecorationRepository extends JpaRepository<SkillDecorations, Long> {
    List<SkillDecorations> findBySkillsId(Long skillId);
}
