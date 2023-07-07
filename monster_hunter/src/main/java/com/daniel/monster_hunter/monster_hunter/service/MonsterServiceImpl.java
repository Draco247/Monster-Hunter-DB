package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
//import com.daniel.monster_hunter.monster_hunter.repository.Quests_MonstersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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

    public List<Map<String, Object>> getMonsterHitzones(Long monsterId) {
        Monsters monsters = monsterRepository.findById(monsterId).orElse(null);
        if (monsters != null) {
            String hitzonesJson = monsters.getHitzones();
            // Parse the JSON string into a list of dictionaries
            // You can use a JSON library like Jackson or Gson for this
            // For example, using Jackson:
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(hitzonesJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public List<Map<String, Object>> getMonsterDrops(Long monsterId) {
        Monsters monsters = monsterRepository.findById(monsterId).orElse(null);
        if (monsters != null) {
            String dropsJson = monsters.getDrops();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(dropsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


}
