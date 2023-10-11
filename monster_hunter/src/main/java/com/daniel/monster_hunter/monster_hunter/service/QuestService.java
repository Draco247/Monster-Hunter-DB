package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.dto.QuestDTO;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

@Service
public interface QuestService {
    public List<QuestDTO> getAllQuests();
    public List<QuestDTO> getAllQuestsByQuestTypeId(Long questtypeid);
    // public QuestDTO getQuest(Long questId);
    // public List<Quests> getQuests();
    // public List<Quests> getAllArenaQuests();
    public Map<String, List<Map<String, Object>>> getQuestMini_Crown(Long questId);
    public Map<String, List<Map<String, Object>>> getQuestKing_Crown(Long questId);
    public List<Map<String, Object>> getQuestRewards(Long questId);
//    List<Monsters> getAllMonstersInQuest(Long questId);
}
