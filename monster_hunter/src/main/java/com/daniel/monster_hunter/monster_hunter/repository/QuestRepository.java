package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestRepository extends JpaRepository<Quests, Integer> {
}
