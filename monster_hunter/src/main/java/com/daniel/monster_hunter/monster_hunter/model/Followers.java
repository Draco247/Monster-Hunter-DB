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
public class Followers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follower_id")
    private Long id;
    private String follower_name;
    private String follower_description;
    private String follower_title;
    private String follower_health;
    private String follower_stamina;
    private String hunting_style;

    @Column(name = "weapons", columnDefinition = "json")
    private String weapons;


}
