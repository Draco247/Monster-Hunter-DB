package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests;
//import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
//import com.daniel.monster_hunter.monster_hunter.repository.Quests_MonstersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestServiceImpl implements QuestService {
    @Autowired
    private QuestRepository questRepository;

    @Override
    public List<Quests> getQuests() {
        return questRepository.findAll();
    }

    public List<Map<String, Object>> getQuestMini_Crown(Long questId){
        Quests quests = questRepository.findById(questId).orElse(null);
        if (quests != null) {
            String mini_crownsJson = quests.getMini_crown();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(mini_crownsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public List<Map<String, Object>> getQuestKing_Crown(Long questId){
        Quests quests = questRepository.findById(questId).orElse(null);
        if (quests != null) {
            String king_crownsJson = quests.getKing_crown();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(king_crownsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public List<Map<String, Object>> getQuestRewards(Long questId){
        Quests quests = questRepository.findById(questId).orElse(null);
        if (quests != null) {
            String rewardsJson = quests.getRewards();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(rewardsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

}
