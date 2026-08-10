package com.kanha.Medium_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor //for no arg constructor
@AllArgsConstructor // for all arguments constructor
@Table(name = "Users")
public class CustomUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, length = 50)
    private String username;

    @Column(unique = true, nullable = false, length = 100)
    private String email;


    @Column(nullable = false)
    private String password;

    private boolean is_verified = false;


//    @Enumerated(EnumType.STRING) //If we don't use this, It take role as integer like 0,1,2,...
    private Role role = Role.USERS;

    private String avatar;

    private String bio;

    @Column(updatable = false)
    private LocalDateTime created_at;

    //we can also use INSTANT Keyword here to handle the values to this variables automatically \
    //ex : private Instant updated_at = Instant.now();
    private LocalDateTime updated_at;

    @OneToMany(mappedBy = "customUser", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Article> articles;

    @JsonIgnore //for not getting the infinite loop 
    @OneToMany(mappedBy = "customUser", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "customUser", cascade = CascadeType.ALL)
    private List<Like> likes;

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    // Automatically set created_at and updated_at on insert
    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
        this.updated_at = LocalDateTime.now();
    }

    // Automatically update updated_at on any update
    @PreUpdate
    protected void onUpdate() {
        this.updated_at = LocalDateTime.now();
    }

    //implemented methods from UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
