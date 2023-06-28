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

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "monsters")
    @JsonIgnore
    private Set<Quests> quests = new HashSet<>();

}


