package com.zidio.projectloopbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {

    private String customerName;

    private String email;

    private String feedback;

}