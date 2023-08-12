package com.daniel.monster_hunter.monster_hunter.service;

import com.daniel.monster_hunter.monster_hunter.model.Weapons;
import com.daniel.monster_hunter.monster_hunter.repository.WeaponRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WeaponServiceImpl implements WeaponService {
    @Autowired
    private WeaponRepository weaponRepository;

    private final JdbcTemplate jdbcTemplate;

    public WeaponServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

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

    public List<Map<String, Object>> getWeaponsForgingByMonsterId(Long monsterId) {
        String sql = "SELECT * " +
                "FROM weapons " +
                "WHERE weapon_id IN ( " +
                "   SELECT weapon_id " +
                "   FROM weapon_forging_items " +
                "   WHERE item_id IN ( " +
                "       SELECT item_id " +
                "       FROM monster_items " +
                "       WHERE monster_id = ? " +
                "   ) " +
                ")";

        return jdbcTemplate.queryForList(sql, monsterId);
    }

    public List<Map<String, Object>> getWeaponsUpgradeByMonsterId(Long monsterId) {
        String sql = "SELECT * " +
                "FROM weapons " +
                "WHERE weapon_id IN ( " +
                "   SELECT weapon_id " +
                "   FROM weapon_upgrade_items " +
                "   WHERE item_id IN ( " +
                "       SELECT item_id " +
                "       FROM monster_items " +
                "       WHERE monster_id = ? " +
                "   ) " +
                ")";

        return jdbcTemplate.queryForList(sql, monsterId);
    }

}
