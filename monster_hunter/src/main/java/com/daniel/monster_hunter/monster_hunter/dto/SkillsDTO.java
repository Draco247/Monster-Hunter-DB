package com.daniel.monster_hunter.monster_hunter.dto;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SkillsDTO {
    private Long id;
    private String skill_name;
    private String skill_description;
    private String skill_levels;
}
