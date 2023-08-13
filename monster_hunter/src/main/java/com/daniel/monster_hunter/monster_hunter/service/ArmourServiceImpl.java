package com.daniel.monster_hunter.monster_hunter.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;


@Service
public class ArmourServiceImpl implements ArmourService{

    private final JdbcTemplate jdbcTemplate;

    public ArmourServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public List<Map<String, Object>> getArmourForgingByMonsterId(Long monsterId) {
        String sql = "SELECT * " +
                "FROM armour " +
                "WHERE armour_id IN ( " +
                "   SELECT armour_id " +
                "   FROM armour_items " +
                "   WHERE item_id IN ( " +
                "       SELECT item_id " +
                "       FROM monster_items " +
                "       WHERE monster_id = ? " +
                "   ) " +
                ")";

        return jdbcTemplate.queryForList(sql, monsterId);
    }
}
