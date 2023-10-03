package com.daniel.monster_hunter.monster_hunter.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "monsters")
public class Monsters {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "monster_id")
    private Long id;
    private String name;
    private String link;
    private String image_link;

    private String description;
    private String monster_size;
    @Column(name = "hitzones" ,columnDefinition = "json")
    private String hitzones;

    @Column(name = "drops" ,columnDefinition = "json")
    private String drops;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "monsters")
    @JsonIgnore
    private Set<Quests> quests = new HashSet<>();

    @Column(name = "monster_type")
    private String monstertype;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "monster_items",
            joinColumns = { @JoinColumn(name = "monster_id") },
            inverseJoinColumns = { @JoinColumn(name = "item_id") })
    private Set<Items> items = new HashSet<>();
    

    

}


