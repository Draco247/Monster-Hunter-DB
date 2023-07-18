package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface MonsterService {
    public List<Monsters> getMonsters();
    public List<Map<String, Object>> getMonsterHitzones(Long monsterId);
    public List<Map<String, Object>> getMonsterDrops(Long monsterId);

//    List<Quests> getAllQuestsForMonster(Long monsterId);
}
