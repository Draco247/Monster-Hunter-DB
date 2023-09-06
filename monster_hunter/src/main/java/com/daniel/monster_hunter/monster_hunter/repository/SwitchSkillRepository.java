package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Skills;
import com.daniel.monster_hunter.monster_hunter.model.SwitchSkills;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwitchSkillRepository extends JpaRepository<SwitchSkills, Long> {
    List<SwitchSkills> findSwitchSkillsByWeapontypeid(Long weapontypeid);
}
