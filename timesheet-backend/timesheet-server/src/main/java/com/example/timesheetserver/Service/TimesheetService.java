package com.example.timesheetserver.Service;

import com.example.timesheetserver.DAO.ProfileRepository;
import com.example.timesheetserver.DAO.TimesheetRepository;
import com.example.timesheetserver.Domain.DailyTimesheet;
import com.example.timesheetserver.Domain.Profile;
import com.example.timesheetserver.Domain.Timesheet;
import com.example.timesheetserver.Domain.Timesheets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class TimesheetService {

    @Autowired
    TimesheetRepository timesheetRepository;

    @Autowired
    ProfileRepository profileRepository;

    public List<Timesheet> findByProfile_Id(String id){
        return timesheetRepository.findByProfile_IdOrderByWeeklyTimesheets_WeekEndingDesc(id);
    }
    public List<Timesheet> findAll(){
        return timesheetRepository.findAll();
    }

    public void updateTimesheet(String id, Timesheets weeklyTimesheets){
        String weekEnding = weeklyTimesheets.getWeekEnding();
        Timesheet timesheet = timesheetRepository.findByProfile_IdAndWeeklyTimesheets_WeekEnding(id, weekEnding);
        Optional<Profile> opt = profileRepository.findById(id);
        int floatingDayUsed = timesheet.getWeeklyTimesheets().getFloatingDayUsed();
        int vacationDayUse = timesheet.getWeeklyTimesheets().getVacationDayUse();
            for(int i = 0; i < timesheet.getWeeklyTimesheets().getDailyTimesheets().size(); i++){
                if(timesheet.getWeeklyTimesheets().getDailyTimesheets().get(i).isFloatingDay() == true && weeklyTimesheets.getDailyTimesheets().get(i).isFloatingDay() == false){
                    floatingDayUsed -= 1;
                    opt.ifPresent(profile -> {
                        profile.setRemainingFloatingDay(profile.getRemainingFloatingDay() + 1);
                        profileRepository.save(profile);
                    });
                }
                if(timesheet.getWeeklyTimesheets().getDailyTimesheets().get(i).isFloatingDay() == false && weeklyTimesheets.getDailyTimesheets().get(i).isFloatingDay() == true){
                    floatingDayUsed += 1;
                    opt.ifPresent(profile -> {
                        profile.setRemainingFloatingDay(profile.getRemainingFloatingDay() - 1);
                        profileRepository.save(profile);
                    });
                }
                if(timesheet.getWeeklyTimesheets().getDailyTimesheets().get(i).isVacation() == false && weeklyTimesheets.getDailyTimesheets().get(i).isVacation() == true){
                    vacationDayUse += 1;
                    opt.ifPresent(profile -> {
                        profile.setRemainingVacationDay(profile.getRemainingVacationDay() - 1);
                        profileRepository.save(profile);
                    });
                }
                if(timesheet.getWeeklyTimesheets().getDailyTimesheets().get(i).isVacation() == true && weeklyTimesheets.getDailyTimesheets().get(i).isVacation() == false){
                    vacationDayUse -= 1;
                    opt.ifPresent(profile -> {
                        profile.setRemainingVacationDay(profile.getRemainingVacationDay() + 1);
                        profileRepository.save(profile);
                    });
                }
            }
            timesheet.getWeeklyTimesheets().setFloatingDayUsed(floatingDayUsed);
            timesheet.getWeeklyTimesheets().setVacationDayUse(vacationDayUse);
            timesheet.getWeeklyTimesheets().setTotalBillingHours(weeklyTimesheets.getTotalBillingHours());
            timesheet.getWeeklyTimesheets().setTotalCompensatedHours(weeklyTimesheets.getTotalCompensatedHours());
            if(weeklyTimesheets.getDocument().getUrl() != null && weeklyTimesheets.getDocument().getType().equals("approved timesheet")){
                    timesheet.getWeeklyTimesheets().setSubmissionStatus("Complete");
            }
            else{
                timesheet.getWeeklyTimesheets().setSubmissionStatus("Incomplete");
            }

            timesheet.getWeeklyTimesheets().getDocument().setType(weeklyTimesheets.getDocument().getType());

            timesheet.getWeeklyTimesheets().setDailyTimesheets(weeklyTimesheets.getDailyTimesheets());

            timesheetRepository.save(timesheet);
    }

    public Timesheet findByProfile_IdAndWeeklyTimesheets_WeekEnding(String id, String weekEnding){
        return timesheetRepository.findByProfile_IdAndWeeklyTimesheets_WeekEnding(id, weekEnding);
    }
    public void save(Timesheet timesheet){
        timesheetRepository.save(timesheet);
    }
}
