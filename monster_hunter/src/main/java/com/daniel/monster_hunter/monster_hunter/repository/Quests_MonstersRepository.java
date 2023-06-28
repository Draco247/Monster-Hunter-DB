package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Quests_MonstersRepository extends JpaRepository<Quests_Monsters, Long> {
    List<Quests_Monsters> findByQuestId(Long questId);
}
