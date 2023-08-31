package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.dto.WeaponDTO;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeaponRepository extends JpaRepository<Weapons, Long> {
//    List<Weapons> findAllByWeaponType(WeaponType weaponType);
//    List<Weapons> find
    List<Weapons> findWeaponsByForgingId(Long itemId);
    List<Weapons> findWeaponsByUpgradeId(Long itemId);

    List<Weapons> findByWeapontypeid(Long typeid);
    @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.WeaponDTO(w.id, w.weapontypeid, w.weapon_name, w.weapon_img_url, w.element, w.elementval, " +
    "w.decoSlots, w.rampagedecoSlots, w.attack, w.rarity, w.base_sharpness, w.max_sharpness, w.additional_property, w.songs, w.shelling_type, w.phial_type, " +
    "w.kinsect_lvl, w.arc_shot_type, w.charge_shot_levels, w.coatings, w.bowgun_stats, w.ammo) FROM Weapons w WHERE w.weapontypeid = :weapontypeid")
    List<WeaponDTO> findAllByWeaponTypeId(@Param("weapontypeid") Long weapontypeid);



    List<Weapons> findByElement(String element);
    List<Weapons> findByWeapontypeidAndElement(Long typeid, String element);
}
