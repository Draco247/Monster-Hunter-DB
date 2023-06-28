package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface Quests_MonstersService{
    Quests_Monsters associateQuestWithMonster(Long questId, Long monsterId);

    List<Long> getMonstersForQuest(Long questId);
}
