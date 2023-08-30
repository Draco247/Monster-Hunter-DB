package com.daniel.monster_hunter.monster_hunter.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonsterDTO {
    private Long id;
    private String name;
    private String monster_size;

}
