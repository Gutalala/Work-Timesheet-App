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
public class Contact {
    private String phone;

    private String email;

    private String address;
}
