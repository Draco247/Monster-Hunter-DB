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
public class ArmourSets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "set_id")
    private Long id;
    private String set_name;
    private String set_img;
    // @Column(name = "armour_pieces", columnDefinition = "json")
    // private String pieces;

    @OneToMany(mappedBy = "armourSet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Armour> armours = new HashSet<>();
}
