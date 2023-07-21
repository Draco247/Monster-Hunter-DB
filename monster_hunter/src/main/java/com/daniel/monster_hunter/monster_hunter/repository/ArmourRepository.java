package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.dto.ArmourDTO;
import com.daniel.monster_hunter.monster_hunter.model.Armour;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArmourRepository extends JpaRepository<Armour, Long> {
    //    List<Weapons> findAllByWeaponType(WeaponType weaponType);
//    List<Weapons> find
//    List<Weapons> findArmourByForgingId(Long itemId);

//    List<Armour> findArmourByItemsId(Long itemId);
    List<Armour> findArmourBySkillsId(Long skillId);
//    @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.ArmourDTO(a.id, a.armour_name, a.m_armour_img_url, a.f_armour_img_url, a.decoSlots, a.defense, a.fire_res, a.water_res, a.ice_res, a.thunder_res, a.dragon_res, a.rarity, a.armourforging, a.armour_description, a.skills) FROM Armour a")
//    List<ArmourDTO> findAllArmourDTO();
}
