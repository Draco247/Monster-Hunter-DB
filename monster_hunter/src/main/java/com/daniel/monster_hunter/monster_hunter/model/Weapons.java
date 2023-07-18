package com.daniel.monster_hunter.monster_hunter.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Weapons {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weapon_id")
    private Long id;

    @Column(name = "weapon_type_id")
    private Long weapontypeid;
    private String weapon_type_name;
    private String weapon_name;
    private String weapon_img_url;
    private String element;

    @Column(name = "element_val")
    private Integer elementval;

    @Column(name = "deco_slots", columnDefinition = "json")
    private String decoSlots;

    @Column(name = "rampage_deco_slots", columnDefinition = "json")
    private String rampagedecoSlots;

    private Integer attack;

    private String rarity;

    @Column(name = "detailed_img_url")
    private String detailed_img;

    private String weapon_description;

    private String forging_mats;

    private String upgrade_mats;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "weapon_forging_items",
            joinColumns = { @JoinColumn(name = "weapon_id") },
            inverseJoinColumns = { @JoinColumn(name = "item_id") })
    private Set<Items> forging = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "weapon_upgrade_items",
            joinColumns = { @JoinColumn(name = "weapon_id") },
            inverseJoinColumns = { @JoinColumn(name = "item_id") })
    private Set<Items> upgrade = new HashSet<>();
}
