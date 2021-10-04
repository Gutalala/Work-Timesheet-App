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
public class DailyTimesheet {

    private String day;

    private String date;

    private String startingTime;

    private String endingTime;

    private boolean isFloatingDay;

    private boolean isHoliday;

    private boolean isVacation;
}
