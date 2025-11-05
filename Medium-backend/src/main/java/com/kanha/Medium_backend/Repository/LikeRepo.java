package com.kanha.Medium_backend.Repository;

import com.kanha.Medium_backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface LikeRepo extends JpaRepository<Like, Long> {
    Like findByArticleIdAndUserId(UUID articleId, UUID currUserOperatingTheSite);
}
