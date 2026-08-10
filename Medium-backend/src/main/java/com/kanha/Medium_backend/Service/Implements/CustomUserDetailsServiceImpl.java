package com.kanha.Medium_backend.Service.Implements;

import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.Service.CustomUserDetailsService;
import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Load By Username is working");

        return userRepo.findByUsername(username).orElseThrow(() ->
            new UsernameNotFoundException("User not exists")
        );
    }
}
