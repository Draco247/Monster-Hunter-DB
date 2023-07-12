package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonsterRepository extends JpaRepository<Monsters, Long> {
    List<Monsters> findMonstersByQuestsId(Long questId);
    List<Monsters> findMonstersByItemsId(Long itemId);

    Optional<Monsters> findById(Long monsterId);
}
