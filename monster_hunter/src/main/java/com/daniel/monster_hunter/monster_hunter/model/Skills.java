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
@Table(name = "armour_skills")
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private Long id;
    private String skill_name;
    private String skill_description;
    @Column(name = "skill_levels" ,columnDefinition = "json")
    private String skill_levels;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "armour_armour_skills",
            joinColumns = { @JoinColumn(name = "skill_id") },
            inverseJoinColumns = { @JoinColumn(name = "armour_id") })
    private Set<Armour> armour = new HashSet<>();

    @OneToMany(mappedBy = "skills", cascade = CascadeType.ALL)
    private Set<SkillDecorations> skillDecorations = new HashSet<>();
}
