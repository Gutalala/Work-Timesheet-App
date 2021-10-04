package com.example.timesheetserver.DAO;

import com.example.timesheetserver.Domain.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TimesheetRepository extends MongoRepository<Timesheet, String> {

    List<Timesheet> findByProfile_IdOrderByWeeklyTimesheets_WeekEndingDesc(String id);
    List<Timesheet> findAll();
    Optional<Timesheet> findById(String id);
    Timesheet findByProfile_IdAndWeeklyTimesheets_WeekEnding(String id, String weekEnding);



}
