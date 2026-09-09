package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Repository.ArticleRepo;
import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.Service.Implements.AuthServiceImpl;
import com.kanha.Medium_backend.model.Article;
import com.kanha.Medium_backend.model.Role;
import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ArticleService {

    @Autowired
    ArticleRepo articleRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    AuthServiceImpl authServiceImpl;

    // add article

    public ResponseEntity<?> addArticle(Article article) {

        //get the user id -> jisme ham article store karna chahte h
        UUID id = authServiceImpl.providingUserId();

        //ab us id se ham poora User find karte h
        CustomUser customUser = userRepo.findById(id).get(); // .get() -> try karo Optional ke andar jo object h use return karo

        System.out.println("Role of the user is : "+customUser.getAuthorities());
        //then us user ko article me store karte hai or ye map ho jata h Many To One ke form me
        try {
            article.setCustomUser(customUser);
            articleRepo.save(article);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    //get article of Specific user By Id

    public ResponseEntity<List<Article>> getArticles() {
        System.out.println("All article got successsfully");
        return new ResponseEntity<>(articleRepo.findAll(), HttpStatus.OK);
    }

    //update the article

    public ResponseEntity<?> updateArticle(Article article, UUID id) {
        Article article1 = articleRepo.findById(id)
                .orElseThrow(
                        () ->
                                new RuntimeException("Article not Existing")
                );

            article1.setCustomUser(article.getCustomUser());
            article1.setTitle(article.getTitle());
            article1.setContent(article.getContent());
            article1.setTags(article.getTags());

        try {
            UUID currentUserId = authServiceImpl.providingUserId();
            CustomUser customUser = userRepo.findById(currentUserId).get();
            article1.setCustomUser(customUser);

            articleRepo.save(article1);
            System.out.println("Successfully updated");
            return new ResponseEntity<>("Successfully Updated the Article", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save this article", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> deleteArticle(UUID id) {
        CustomUser customUser = userRepo.findById(authServiceImpl.providingUserId()).get();

        UUID userStoredInCurrentArticleId = articleRepo.findById(id).get().getCustomUser().getId();
        if((customUser.getId().equals(userStoredInCurrentArticleId)) || (customUser.getRole() == Role.ADMIN)){
            articleRepo.deleteById(id);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Unauthorized", HttpStatus.FORBIDDEN);
        }
    }

    //get all the article of that current user by It's id
    public ResponseEntity<List<Article>> getArticlesofCurrentUser() {
        //remember that we'll fetch only those articles which is to be returned by 1 own user

        CustomUser currLoggedInCustomUser = null;
        try {
            currLoggedInCustomUser = userRepo.findById(authServiceImpl.providingUserId()).get();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        //now we'll check the articles written by him
        List<Article> list = currLoggedInCustomUser.getArticles();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
