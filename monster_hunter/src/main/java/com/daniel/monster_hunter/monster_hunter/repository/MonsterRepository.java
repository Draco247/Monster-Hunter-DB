package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonsterRepository extends JpaRepository<Monsters, Long> {
    List<Monsters> findMonstersByQuestsId(Long questId);
}
