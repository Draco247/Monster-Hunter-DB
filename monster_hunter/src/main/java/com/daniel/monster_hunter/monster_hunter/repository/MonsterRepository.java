package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.dto.MonsterDTO;
import com.daniel.monster_hunter.monster_hunter.model.Monsters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonsterRepository extends JpaRepository<Monsters, Long> {
    @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.MonsterDTO(m.id, m.name, m.monster_size) FROM Monsters m")
    List<MonsterDTO> findAllBy();

    @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.MonsterDTO(m.id, m.name, m.monster_size) FROM Monsters m WHERE m.monstertype = :monstertype")
    List<MonsterDTO> findAllByMonstertype(@Param("monstertype") String monstertype);

    
    List<Monsters> findMonstersByQuestsId(Long questId);
    List<Monsters> findMonstersByItemsId(Long itemId);

    Optional<Monsters> findById(Long monsterId);
}
