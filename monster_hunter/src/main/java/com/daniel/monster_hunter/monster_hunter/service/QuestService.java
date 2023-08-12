package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface QuestService {
    public List<Quests> getQuests();
    public List<Map<String, Object>> getQuestMini_Crown(Long questId);
    public List<Map<String, Object>> getQuestKing_Crown(Long questId);
    public List<Map<String, Object>> getQuestRewards(Long questId);
//    List<Monsters> getAllMonstersInQuest(Long questId);
}
