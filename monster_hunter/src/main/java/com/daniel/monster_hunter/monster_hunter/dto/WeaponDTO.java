package com.daniel.monster_hunter.monster_hunter.dto;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WeaponDTO {
    private Long id;
    private Long weapontypeid;
    private String weapon_name;
    private String weapon_img_url;
    private String element;
    private Integer elementval;
    private String decoSlots;
    private String rampagedecoSlots;
    private Integer attack;
    private String rarity;
    private String base_sharpness;
    private String max_sharpness;
    private String additional_property;
    private String songs;
    private String shelling_type;
    private String phial_type;
    private String kinsect_lvl;
    private String arc_shot_type;
    private String charge_shot_levels;
    private String coatings;
    private String bowgun_stats;
    private String ammo;
}
