package com.daniel.monster_hunter.monster_hunter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "skill_decorations")
public class SkillDecorations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "decoration_id")
    private Long id;
    private String decoration_name;
    @Column(name = "skill_id", insertable=false, updatable=false)
    private Long decoskillid;
    private String skill_name;
    private String skill_description;
    @Column(name = "skill_level")
    private String skill_lvl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id")
    @JsonIgnore
    private Skills skills;

    @Column(name = "crafting_materials" ,columnDefinition = "json")
    private String crafting;
}
