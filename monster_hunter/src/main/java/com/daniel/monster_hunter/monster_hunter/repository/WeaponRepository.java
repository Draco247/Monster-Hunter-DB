package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeaponRepository extends JpaRepository<Weapons, Long> {
//    List<Weapons> findAllByWeaponType(WeaponType weaponType);
//    List<Weapons> find
    List<Weapons> findWeaponsByForgingId(Long itemId);
    List<Weapons> findWeaponsByUpgradeId(Long itemId);

    List<Weapons> findByWeapontypeid(Long typeid);

    List<Weapons> findByElement(String element);
    List<Weapons> findByWeapontypeidAndElement(Long typeid, String element);
}
