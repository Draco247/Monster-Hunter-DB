package com.daniel.monster_hunter.monster_hunter.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quests")
public class Quests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quest_id")
    private Long id;

    private String quest_name;
    private String quest_url;
    private String objective;
    private String HRP;
    private String MRP;
    private String failure_conditions;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "quest_monsters",
            joinColumns = { @JoinColumn(name = "quest_id") },
            inverseJoinColumns = { @JoinColumn(name = "monster_id") })
    private Set<Monsters> monsters = new HashSet<>();

}
