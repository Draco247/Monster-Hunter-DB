package com.daniel.monster_hunter.monster_hunter.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Quests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quest_id;
    private String quest_name;
    private String quest_url;
    private String objective;
    private String HRP;
    private String MRP;
    private String failure_conditions;

    public Quests() {
    }

    public int getQuest_id() {
        return quest_id;
    }

    public void setQuest_id(int quest_id) {
        this.quest_id = quest_id;
    }

    public String getQuest_name() {
        return quest_name;
    }

    public void setQuest_name(String quest_name) {
        this.quest_name = quest_name;
    }

    public String getQuest_url() {
        return quest_url;
    }

    public void setQuest_url(String quest_url) {
        this.quest_url = quest_url;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getHRP() {
        return HRP;
    }

    public void setHRP(String HRP) {
        this.HRP = HRP;
    }

    public String getMRP() {
        return MRP;
    }

    public void setMRP(String MRP) {
        this.MRP = MRP;
    }

    public String getFailure_conditions() {
        return failure_conditions;
    }

    public void setFailure_conditions(String failure_conditions) {
        this.failure_conditions = failure_conditions;
    }
}
