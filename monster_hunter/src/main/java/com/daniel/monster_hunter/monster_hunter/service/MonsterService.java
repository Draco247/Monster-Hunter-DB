package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface MonsterService {
    public List<Monsters> getMonsters();
}
