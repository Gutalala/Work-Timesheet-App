package com.example.profileserver.Domain;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Document
public class Profile {

    @Id
    private String id;

    private String name;

    private String profilePicture;

    private Contact contact;

    private List<EmergencyContacts> emergencyContacts;

    private List<DailyTimesheet> template;

    private Integer remainingFloatingDay;
    private Integer remainingVacationDay;

}
