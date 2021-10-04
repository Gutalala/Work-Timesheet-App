package com.example.timesheetserver.Domain;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Document
public class Timesheet {

    @Id
    private String id;

    //private List<Timesheets> timesheetslist;

    //private int floaingDayRemaining;

    //private int holidayRemaining;

    //private int vacationDayRemaining;

    private Timesheets weeklyTimesheets;

    @DBRef
    private Profile profile;

}
