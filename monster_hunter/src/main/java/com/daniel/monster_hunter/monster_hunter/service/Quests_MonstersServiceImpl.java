package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import com.daniel.monster_hunter.monster_hunter.model.Quests_Monsters;
import com.daniel.monster_hunter.monster_hunter.repository.MonsterRepository;
import com.daniel.monster_hunter.monster_hunter.repository.Quests_MonstersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.daniel.monster_hunter.monster_hunter.service.Quests_MonstersService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class Quests_MonstersServiceImpl implements Quests_MonstersService{

    @Autowired
    private Quests_MonstersRepository quests_monstersRepository;
    @Override
    public Quests_Monsters associateQuestWithMonster(Long questId, Long monsterId) {
        Quests_Monsters questMonster = new Quests_Monsters();
        questMonster.setQuestId(questId);
        questMonster.setMonsterId(monsterId);
        return quests_monstersRepository.save(questMonster);
    }

    @Override
    public List<Long> getMonstersForQuest(Long questId) {
        return quests_monstersRepository.findByQuestId(questId)
                .stream()
                .map(Quests_Monsters::getMonsterId)
                .collect(Collectors.toList());
    }
}
