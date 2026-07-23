package com.zidio.projectloopbackend.repository;

import com.zidio.projectloopbackend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}