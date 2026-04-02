package com.kanha.Medium_backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Admin")
public class AdminApi {
    @GetMapping("/")
    public void greetAdmin(){
        System.out.println("Hello Admin");
    }

}
