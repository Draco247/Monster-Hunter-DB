package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.dto.MonsterDTO;
import com.daniel.monster_hunter.monster_hunter.dto.QuestDTO;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Set;


@Service
public class QuestServiceImpl implements QuestService {
    @Autowired
    private QuestRepository questRepository;


    public List<QuestDTO> getAllQuests() {
        List<Quests> quests = questRepository.findAllQuests();

        return quests.stream().map(this::mapQuestToDTO).collect(Collectors.toList());
    }

    private QuestDTO mapQuestToDTO(Quests quest) {
        QuestDTO questDTO = new QuestDTO();
        questDTO.setId(quest.getId());
        questDTO.setQuest_name(quest.getQuest_name());
        questDTO.setQuest_type(quest.getQuest_type());
        questDTO.setQuesttypeid(quest.getQuesttypeid());
        questDTO.setQuest_lvl(quest.getQuest_lvl());
        questDTO.setObjective(quest.getObjective());

        Set<MonsterDTO> monsterDTOs = quest.getMonsters().stream()
                .map(monster -> {
                    MonsterDTO monsterDTO = new MonsterDTO();
                    monsterDTO.setId(monster.getId());
                    monsterDTO.setName(monster.getName());
                    monsterDTO.setMonster_size(monster.getMonster_size());
                    // Set other monster DTO fields

                    return monsterDTO;
                })
                .collect(Collectors.toSet());

        questDTO.setMonsters(monsterDTOs);

        return questDTO;
    }

    public List<QuestDTO> getAllQuestsByQuestTypeId(Long questtypeid) {
        List<Quests> quests = questRepository.findAllQuestsByQuestTypeId(questtypeid);

        return quests.stream().map(this::mapQuestToDTO).collect(Collectors.toList());
    }


    // public QuestDTO getQuest(Long questId) {
    //     Quests quest = questRepository.findById(questId).orElse(null);
    //     if (quest == null) {
    //         // Handle not found case
    //     }

    //     QuestDTO questDTO = new QuestDTO();
    //     questDTO.setId(quest.getId());
    //     questDTO.setQuest_name(quest.getQuest_name());
    //     questDTO.setQuest_type(quest.getQuest_type());
    //     questDTO.setQuesttypeid(quest.getQuesttypeid());
    //     questDTO.setQuest_lvl(quest.getQuest_lvl());

        
    //     // Construct a list of MonsterDTOs from quest's monsters
    //     Set<MonsterDTO> monsterDTOs = quest.getMonsters().stream()
    //             .map(monster -> {
    //                 MonsterDTO monsterDTO = new MonsterDTO();
    //                 monsterDTO.setId(monster.getId());
    //                 monsterDTO.setName(monster.getName());
    //                 monsterDTO.setMonster_size(monster.getMonster_size());
    //                 // Set other monster DTO fields
                    
    //                 return monsterDTO;
    //             })
    //             .collect(Collectors.toSet());
        
    //     questDTO.setMonsters(monsterDTOs);

    //     return questDTO;
    // }

    // @Override
    // public List<Quests> getQuests() {
    //     List<Quests> quests = questRepository.findAll();
        
    //     for (Quests quest : quests) {
    //         Set<MonsterDTO> monsterDTOs = quest.getMonsters().stream()
    //                 .map(monster -> new MonsterDTO(monster.getId(), monster.getName(), monster.getMonster_size()))
    //                 .collect(Collectors.toSet());
            
    //         quest.setMonsterDTOs(monsterDTOs);
    //     }
        
    //     return quests;
    // }

    // public List<Map<String, Object>> getQuestMini_Crown(Long questId){
    //     Quests quests = questRepository.findById(questId).orElse(null);
    //     if (quests != null) {
    //         String mini_crownsJson = quests.getMini_crown();
    //         ObjectMapper objectMapper = new ObjectMapper();
    //         try {
    //             return objectMapper.readValue(mini_crownsJson, List.class);
    //         } catch (JsonProcessingException e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return null;
    // }

    // public List<Map<String, Object>> getQuestKing_Crown(Long questId){
    //     Quests quests = questRepository.findById(questId).orElse(null);
    //     if (quests != null) {
    //         String king_crownsJson = quests.getKing_crown();
    //         ObjectMapper objectMapper = new ObjectMapper();
    //         try {
    //             return objectMapper.readValue(king_crownsJson, List.class);
    //         } catch (JsonProcessingException e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return null;
    // }

    // public List<Map<String, Object>> getQuestRewards(Long questId){
    //     Quests quests = questRepository.findById(questId).orElse(null);
    //     if (quests != null) {
    //         String rewardsJson = quests.getRewards();
    //         ObjectMapper objectMapper = new ObjectMapper();
    //         try {
    //             return objectMapper.readValue(rewardsJson, List.class);
    //         } catch (JsonProcessingException e) {
    //             e.printStackTrace();
    //         }
    //     }
    //     return null;
    // }

}
