package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
//import com.daniel.monster_hunter.monster_hunter.repository.Quests_MonstersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MonsterServiceImpl implements MonsterService{

    @Autowired
    private MonsterRepository monsterRepository;

    @Override
    public List<Monsters> getMonsters() {
        return monsterRepository.findAll();
    }


}
