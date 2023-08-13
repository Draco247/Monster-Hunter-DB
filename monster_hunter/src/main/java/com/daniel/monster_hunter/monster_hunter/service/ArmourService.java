package com.daniel.monster_hunter.monster_hunter.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ArmourService {
    public List<Map<String, Object>> getArmourForgingByMonsterId(Long monsterId);
}
