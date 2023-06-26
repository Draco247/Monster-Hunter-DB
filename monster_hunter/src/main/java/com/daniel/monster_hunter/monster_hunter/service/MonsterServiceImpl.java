package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.daniel.monster_hunter.monster_hunter.service.MonsterService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MonsterServiceImpl implements MonsterService{

    @Autowired
    private MonsterRepository monsterRepository;
    @Override
    public List<Monsters> getMonsters() {
        return monsterRepository.findAll();
    }
}
