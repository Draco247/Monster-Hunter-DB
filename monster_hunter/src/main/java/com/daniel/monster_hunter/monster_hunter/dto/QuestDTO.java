package com.daniel.monster_hunter.monster_hunter.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.Map;

import com.daniel.monster_hunter.monster_hunter.model.Monsters;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestDTO {
    private Long id;
    private String quest_name;
    private Set<MonsterDTO> monsters;
    private String quest_type;
    private Long questtypeid;
    private String quest_lvl;
    private String objective;
    
}
