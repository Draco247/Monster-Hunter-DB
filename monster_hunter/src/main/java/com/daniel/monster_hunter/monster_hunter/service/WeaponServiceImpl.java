package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import com.daniel.monster_hunter.monster_hunter.repository.QuestRepository;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeaponServiceImpl implements WeaponService {
    @Autowired
    private WeaponRepository weaponRepository;
    public List<String> getWeaponDecoSlots(Long weaponId) {
        Weapons weapons = weaponRepository.findById(weaponId).orElse(null);
        if (weapons != null) {
            String decoSlotsJson = weapons.getDecoSlots();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(decoSlotsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public List<String> getWeaponRampageDecoSlots(Long weaponId) {
        Weapons weapons = weaponRepository.findById(weaponId).orElse(null);
        if (weapons != null) {
            String rampagedecoSlotsJson = weapons.getRampagedecoSlots();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(rampagedecoSlotsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
