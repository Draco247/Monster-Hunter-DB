package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ItemRepository extends JpaRepository<Items,Long> {
    List<Items> findItemsByMonstersId(Long monsterId);
    List<Items> findItemsByForgingId(Long monsterId);
    List<Items> findItemsByArmourforgingId(Long armourId);
//    List<Items> findItemsByWeaponsId(Long weaponId);
    List<Items> findItemsByItemtype(String itemtype);
}
