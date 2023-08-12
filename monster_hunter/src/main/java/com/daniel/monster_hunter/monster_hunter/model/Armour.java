package com.daniel.monster_hunter.monster_hunter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Armour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "armour_id")
    private Long id;
    private String armour_name;
    private String m_armour_img_url;
    private String f_armour_img_url;

    @Column(name = "deco_slots", columnDefinition = "json")
    private String decoSlots;

    private Integer defense;
    private Integer fire_res;
    private Integer water_res;
    private Integer ice_res;
    private Integer thunder_res;
    private Integer dragon_res;
    private String rarity;

//    @Column(name = "armour_skills", columnDefinition = "json")
//    private String skills;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "armour_items",
            joinColumns = { @JoinColumn(name = "armour_id") },
            inverseJoinColumns = { @JoinColumn(name = "item_id") })
    private Set<Items> armourforging = new HashSet<>();

    @Column(name = "forging_materials", columnDefinition = "json")
    private String forgingmats;

    @Column(name = "armour_skills", columnDefinition = "json")
    private String armourskills;

    private String armour_description;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "armour")
    @JsonIgnore
    private Set<Skills> skills = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "set_id")
    @JsonIgnore
    private ArmourSets armourSet;
}
