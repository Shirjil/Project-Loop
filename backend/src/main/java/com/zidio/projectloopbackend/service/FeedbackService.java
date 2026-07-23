package com.zidio.projectloopbackend.service;

import com.zidio.projectloopbackend.dto.FeedbackDTO;
import com.zidio.projectloopbackend.entity.Feedback;

import java.util.List;

public interface FeedbackService {

    Feedback saveFeedback(FeedbackDTO feedbackDTO);

    List<Feedback> getAllFeedback();

    void deleteFeedback(Long id);

    Feedback updateFeedback(Long id, FeedbackDTO feedbackDTO);

}