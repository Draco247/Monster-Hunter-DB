package com.daniel.monster_hunter.monster_hunter.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface WeaponService {
    public List<String> getWeaponDecoSlots(Long weaponId);
    public List<String> getWeaponRampageDecoSlots(Long weaponId);

    public List<Map<String, Object>> getWeaponsForgingByMonsterId(Long monsterId);
    public List<Map<String, Object>> getWeaponsUpgradeByMonsterId(Long monsterId);

}
