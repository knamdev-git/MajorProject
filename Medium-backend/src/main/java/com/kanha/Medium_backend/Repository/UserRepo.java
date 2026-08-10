package com.kanha.Medium_backend.Repository;

import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<CustomUser, UUID> {
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String username);

    Optional<UserDetails> findByUsername(String username);

    CustomUser getByUsername(String username);
}