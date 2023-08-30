package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skills, Long> {
    //    List<Weapons> findAllByWeaponType(WeaponType weaponType);
//    List<Weapons> find
    List<Skills> findSkillsByArmourId(Long armourId);

}
