package com.daniel.monster_hunter.monster_hunter.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WeaponService {
    public List<String> getWeaponDecoSlots(Long weaponId);
    public List<String> getWeaponRampageDecoSlots(Long weaponId);
}
