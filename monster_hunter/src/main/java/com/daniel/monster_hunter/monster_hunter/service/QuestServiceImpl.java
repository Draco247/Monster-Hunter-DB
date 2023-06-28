package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Quests;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestServiceImpl implements QuestService {
    @Autowired
    private QuestRepository questRepository;

    @Override
    public List<Quests> getQuests() {
        return questRepository.findAll();
    }
}
