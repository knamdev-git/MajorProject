package com.kanha.Medium_backend.controller;

import com.kanha.Medium_backend.Service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class LikeApi {

    @Autowired
    LikeService likeService;

    // add like
    @PreAuthorize("hasAuthority('USERS')")
    @PostMapping("/like/{articleId}")
    public void like(@PathVariable UUID articleId){
        likeService.addLike(articleId);
    }

    // remove like
    @PreAuthorize("hasAuthority('USERS')")
    @DeleteMapping("/unlike/{articleId}")
    public void unlike(@PathVariable UUID articleId){
        likeService.deleteLike(articleId);
    }

}
