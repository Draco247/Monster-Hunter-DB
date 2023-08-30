package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.dto.QuestDTO;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quests, Long> {
    // @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.QuestDTO(q.id, q.quest_name, q.monsters, q.quest_type, q.questtypeid, q.quest_lvl) FROM Quests q")
    // List<QuestDTO> findAllBy();
    List<Quests> findQuestsByMonstersId(Long monsterId);
    List<Quests> findQuestsByQuesttypeid(Long questtypeid);
    // @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.QuestDTO(q.id, q.quest_name, q.quest_type, q.questtypeid, q.quest_lvl) FROM Quests q WHERE q.questtypeid = :questtypeid")
    // List<QuestDTO> findQuestsByQuesttypeid(@Param("questtypeid") Long questtypeid);
    
}
