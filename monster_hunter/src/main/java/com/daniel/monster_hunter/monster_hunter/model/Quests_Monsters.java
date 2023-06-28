package com.daniel.monster_hunter.monster_hunter.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quest_monsters")
public class Quests_Monsters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quest_id")
    private Long questId;

    @Column(name = "monster_id")
    private Long monsterId;

    public Quests_Monsters() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestId() {
        return questId;
    }

    public void setQuestId(Long questId) {
        this.questId = questId;
    }

    public Long getMonsterId() {
        return monsterId;
    }

    public void setMonsterId(Long monsterId) {
        this.monsterId = monsterId;
    }

    // Constructors, getters, and setters
}

