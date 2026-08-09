package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    //getting the user by it's id
    public User getProfileById(UUID id){
        return userRepo.findById(id).orElse(null);
//        return user;
    }

    //getting all the users
    public ResponseEntity<List<User>> getProfileAllUsers(){
        List<User> users = userRepo.findAll();

        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK); // 200 OK with users
        }
    }

    public ResponseEntity<?> updateUser(User user, UUID id) {
       User user1 = userRepo.getReferenceById(id);

       if(user1 != null) {
           user1.setRole(user.getRole());
           user1.setAvatar(user.getAvatar());
           user1.setBio(user.getBio());
           user1.setUsername(user.getUsername());
           user1.setEmail(user.getEmail());
           user1.setPassword(user.getPassword());
           user1.setRole(user.getRole());
       }
        try {
            userRepo.save(user1);
            return new ResponseEntity<>("Successfully Updated", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Fill the Required fields properly",HttpStatus.BAD_REQUEST);
        }
    }

    public User addUser(User user) {
            if(userRepo.existsByUsername(user.getUsername())){
                System.out.println("Username already exists");
                return null;
            }

            if(userRepo.existsByEmail(user.getEmail())){
                System.out.println("Email already exists in the server");
                return null;
            }

            User savedUser = userRepo.save(user);
            return savedUser;
    }

    //to delete the user
    public ResponseEntity<?> deleteUserByID(UUID id) {
        //if user is not null then delete otherwise httpStatus Not Found
        User user = userRepo.getReferenceById(id);

        if(user != null) {
            userRepo.delete(user);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
