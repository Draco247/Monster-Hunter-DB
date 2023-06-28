package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface MonsterService {
    public List<Monsters> getMonsters();
//    List<Quests> getAllQuestsForMonster(Long monsterId);
}
