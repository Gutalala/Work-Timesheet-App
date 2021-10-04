package com.example.timesheetserver.Domain;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@org.springframework.data.mongodb.core.mapping.Document
public class Document {

    private String type;

    private String url;

    private String title;

    private String uploadedBy;

    private String uploadedTime;
}
