package com.zidio.projectloopbackend.service;

import com.zidio.projectloopbackend.dto.FeedbackDTO;
import com.zidio.projectloopbackend.entity.Feedback;
import com.zidio.projectloopbackend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback saveFeedback(FeedbackDTO feedbackDTO) {

        Feedback feedback = new Feedback();

        feedback.setCustomerName(feedbackDTO.getCustomerName());
        feedback.setEmail(feedbackDTO.getEmail());
        feedback.setFeedback(feedbackDTO.getFeedback());

        // Save current date & time
        feedback.setCreatedAt(LocalDateTime.now());

        setSentiment(feedback, feedbackDTO.getFeedback());

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    @Override
    public Feedback updateFeedback(Long id, FeedbackDTO feedbackDTO) {

        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        feedback.setCustomerName(feedbackDTO.getCustomerName());
        feedback.setEmail(feedbackDTO.getEmail());
        feedback.setFeedback(feedbackDTO.getFeedback());

        setSentiment(feedback, feedbackDTO.getFeedback());

        return feedbackRepository.save(feedback);
    }

    // Common Sentiment Method
    private void setSentiment(Feedback feedback, String feedbackText) {

        String text = feedbackText.toLowerCase();

        if (text.contains("good") ||
                text.contains("excellent") ||
                text.contains("great") ||
                text.contains("awesome") ||
                text.contains("amazing") ||
                text.contains("happy") ||
                text.contains("best") ||
                text.contains("love") ||
                text.contains("nice")) {

            feedback.setSentiment("Positive");

        } else if (text.contains("bad") ||
                text.contains("poor") ||
                text.contains("worst") ||
                text.contains("terrible") ||
                text.contains("hate") ||
                text.contains("sad") ||
                text.contains("disappointed") ||
                text.contains("worried") ||
            text.contains("angry"))
        {

            feedback.setSentiment("Negative");

        } else {

            feedback.setSentiment("Neutral");
        }
    }
}