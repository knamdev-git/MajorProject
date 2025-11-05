package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Exception.CannotLikeSameUserException;
import com.kanha.Medium_backend.Repository.ArticleRepo;
import com.kanha.Medium_backend.Repository.LikeRepo;
import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.model.Like;
import com.kanha.Medium_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class LikeService {
    @Autowired
    LikeRepo likeRepo;

    @Autowired
    AuthService authService;

    @Autowired
    ArticleRepo articleRepo;

    @Autowired
    UserRepo userRepo;

    public void addLike(UUID articleId) {

        //only diff user can like to another article post
        UUID currUserOpeartingTheWebsId = authService.providingUserId();
        //currArticle's user id
        UUID userIdOfThisArticle = articleRepo.findById(articleId).orElseThrow(() -> new RuntimeException("Not found")).getUser().getId();
        if(!userIdOfThisArticle.equals(currUserOpeartingTheWebsId)){ // if both users are different then only like perform
            Like like = new Like();
            like.setArticle(articleRepo.findById(articleId).orElseThrow(()->new RuntimeException("Article is not found")));
            like.setUser(userRepo.findById(currUserOpeartingTheWebsId).orElseThrow(()->new RuntimeException("Invalid User")));
            like.setCreatedAt(LocalDateTime.now());
            likeRepo.save(like);
        }else{
            throw new CannotLikeSameUserException("Can't like the same Article");
        }
    }

    public void deleteLike(UUID articleId){
        UUID currUserOperatingTheSite = authService.providingUserId();

        Like like = likeRepo.findByArticleIdAndUserId(articleId, currUserOperatingTheSite);
        if(like == null)
            throw new RuntimeException("You didn't like this");
        else{
            UUID ownerOfThisArticle = articleRepo.findById(articleId)
                    .orElseThrow(() -> new RuntimeException("Article not found"))
                    .getUser().getId();

            if(currUserOperatingTheSite.equals(ownerOfThisArticle))
                throw new CannotLikeSameUserException("You can not unlike your own Article");

            likeRepo.delete(like);
        }

    }
}
