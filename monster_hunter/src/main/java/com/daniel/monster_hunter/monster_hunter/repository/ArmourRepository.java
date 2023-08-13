package com.daniel.monster_hunter.monster_hunter.repository;

//import com.daniel.monster_hunter.monster_hunter.dto.ArmourDTO;
import com.daniel.monster_hunter.monster_hunter.model.Armour;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArmourRepository extends JpaRepository<Armour, Long> {
    List<Armour> findByArmourforgingId(Long itemId);
    List<Armour> findArmourBySkillsId(Long skillId);
}
