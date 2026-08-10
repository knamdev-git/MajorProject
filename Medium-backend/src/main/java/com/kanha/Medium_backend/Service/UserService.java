package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    public CustomUser getProfileById(UUID id){
        return userRepo.findById(id).orElse(null);
//        return user;
    }

    //getting all the users
    public ResponseEntity<List<CustomUser>> getProfileAllUsers(){
        List<CustomUser> customUsers = userRepo.findAll();

        if (customUsers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } else {
            return new ResponseEntity<>(customUsers, HttpStatus.OK); // 200 OK with users
        }
    }

    public ResponseEntity<?> updateUser(CustomUser customUser, UUID id) {
       CustomUser customUser1 = userRepo.getReferenceById(id);

       if(customUser1 != null) {
           customUser1.setRole(customUser.getRole());
           customUser1.setAvatar(customUser.getAvatar());
           customUser1.setBio(customUser.getBio());
           customUser1.setUsername(customUser.getUsername());
           customUser1.setEmail(customUser.getEmail());
           customUser1.setPassword(customUser.getPassword());
           customUser1.setRole(customUser.getRole());
       }
        try {
            userRepo.save(customUser1);
            return new ResponseEntity<>("Successfully Updated", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Fill the Required fields properly",HttpStatus.BAD_REQUEST);
        }
    }

    public CustomUser addUser(CustomUser customUser) {
            if(userRepo.existsByUsername(customUser.getUsername())){
                System.out.println("Username already exists");
                return null;
            }

            if(userRepo.existsByEmail(customUser.getEmail())){
                System.out.println("Email already exists in the server");
                return null;
            }

            CustomUser savedCustomUser = userRepo.save(customUser);
            return savedCustomUser;
    }

    //to delete the user
    public ResponseEntity<?> deleteUserByID(UUID id) {
        //if user is not null then delete otherwise httpStatus Not Found
        CustomUser customUser = userRepo.getReferenceById(id);

        if(customUser != null) {
            userRepo.delete(customUser);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
