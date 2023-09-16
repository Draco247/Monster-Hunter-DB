package com.daniel.monster_hunter.monster_hunter.repository;

import com.daniel.monster_hunter.monster_hunter.dto.ArmourSetsDTO;
import com.daniel.monster_hunter.monster_hunter.model.ArmourSets;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArmourSetRepository extends JpaRepository<ArmourSets, Long> {
    @Query("SELECT new com.daniel.monster_hunter.monster_hunter.dto.ArmourSetsDTO(a.id, a.set_name, a.set_img) FROM ArmourSets a")
    List<ArmourSetsDTO> findAllBy();

    // List<ArmourSets> findArmourPiecesByArmourSetsId(Long id);
}
