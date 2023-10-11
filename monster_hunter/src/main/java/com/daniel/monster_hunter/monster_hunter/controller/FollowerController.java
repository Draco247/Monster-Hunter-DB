package com.daniel.monster_hunter.monster_hunter.controller;

import com.daniel.monster_hunter.monster_hunter.model.Followers;
import com.daniel.monster_hunter.monster_hunter.repository.FollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/followers")
@CrossOrigin
public class FollowerController {

    @Autowired
    private FollowerRepository followerRepository;

    @GetMapping("/getAll")
    public List<Followers> getAllFollowers() {
        return followerRepository.findAll();
    }
    // public List<Skills> getAllSkills() {
    //     return skillRepository.findAll();
    // }

}
