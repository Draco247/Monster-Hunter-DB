package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ItemRepository extends JpaRepository<Items,Long> {
    List<Items> findItemsByMonstersId(Long monsterId);
//    List<Items> findItemsByWeaponsId(Long weaponId);
}
