package com.example.timesheetserver.Service;


import com.example.timesheetserver.DAO.TimesheetRepository;
import com.example.timesheetserver.Domain.Document;
import com.example.timesheetserver.Domain.Profile;
import com.example.timesheetserver.Domain.Timesheet;
import com.example.timesheetserver.Domain.Timesheets;
import com.example.timesheetserver.Util.CurrentTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

public class GenerateTimesheetService {

    @Autowired
    ProfileService profileService;

    @Autowired
    TimesheetService timesheetService;

    @Scheduled(cron = " 0 0 0 ? * SAT *")
    public void generateTimesheet(){
        List<Profile> profileList = profileService.findAll();
        for(Profile p : profileList){
            Timesheets weeklyTimesheet = new Timesheets();
            weeklyTimesheet.setWeekEnding(CurrentTime.getCurrentTime());
            weeklyTimesheet.setTotalCompensatedHours(0);
            weeklyTimesheet.setTotalBillingHours(0);
            weeklyTimesheet.setSubmissionStatus("Not Started");
            weeklyTimesheet.setApprovedStatus("N/A");
            weeklyTimesheet.setFloatingDayUsed(0);
            weeklyTimesheet.setVacationDayUse(0);
            weeklyTimesheet.setHolidayUsed(0);
            weeklyTimesheet.setDailyTimesheets(p.getTemplate());
            Document d = new Document();
            d.setTitle("");
            d.setType("");
            d.setUploadedBy(p.getName());
            d.setUploadedTime("");
            d.setUrl("");
            weeklyTimesheet.setDocument(d);
            timesheetService.save(Timesheet.builder().profile(p).weeklyTimesheets(weeklyTimesheet).build());
        }

    }
}
