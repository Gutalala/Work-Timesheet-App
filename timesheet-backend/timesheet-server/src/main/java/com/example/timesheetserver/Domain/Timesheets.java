package com.example.timesheetserver.Domain;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Document
public class Timesheets {

    private String weekEnding;

    private float totalCompensatedHours;

    private float totalBillingHours;

    private String submissionStatus;

    private String approvedStatus;

    private int floatingDayUsed;

    private int vacationDayUse;

    private int holidayUsed;

    private com.example.timesheetserver.Domain.Document document;

    private List<DailyTimesheet> dailyTimesheets;
}
