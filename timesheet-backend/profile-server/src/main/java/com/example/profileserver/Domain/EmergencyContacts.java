package com.example.profileserver.Domain;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Document
public class EmergencyContacts {

    private String firstName;

    private String lastName;

    private String phone;
}
