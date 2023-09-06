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
@Table(name = "switch_skills")
public class SwitchSkills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "switch_skill_id")
    private Long id;

    private String switch_skill_name;
    private String switch_skill_description;
    @Column(name = "weapon_type_id")
    private Long weapontypeid;
}

