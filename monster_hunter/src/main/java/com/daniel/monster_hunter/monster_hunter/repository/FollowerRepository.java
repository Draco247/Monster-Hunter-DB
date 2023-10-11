package com.daniel.monster_hunter.monster_hunter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daniel.monster_hunter.monster_hunter.model.Followers;

@Repository
public interface FollowerRepository extends JpaRepository<Followers, Long> {
    
}
