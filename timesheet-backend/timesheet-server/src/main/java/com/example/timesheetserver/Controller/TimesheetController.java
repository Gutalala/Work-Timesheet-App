package com.example.timesheetserver.Controller;

import com.example.timesheetserver.DAO.TimesheetRepository;
import com.example.timesheetserver.Domain.*;
import com.example.timesheetserver.Service.AmazonClient;
import com.example.timesheetserver.Service.ProfileService;
import com.example.timesheetserver.Service.TimesheetService;
import com.example.timesheetserver.Util.CurrentTime;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLOutput;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {

    @Autowired
    TimesheetService timesheetService;

    @Autowired
    ProfileService profileService;

    private AmazonClient amazonClient;

    @Autowired
    public void setAmazonClient(AmazonClient amazonClient){this.amazonClient = amazonClient;}

    private RabbitTemplate rabbitTemplate;

    @Autowired
    public void setRabbitTemplate(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }


    @CrossOrigin
    @GetMapping("/approveStatus")
    public ResponseEntity approveStatus(@RequestParam("id") String id, @RequestParam("weekEnding") String weekEnding, @RequestParam("approving") String approving){
        Timesheet t = timesheetService.findByProfile_IdAndWeeklyTimesheets_WeekEnding(id, weekEnding);
        t.getWeeklyTimesheets().setApprovedStatus(approving);
        if(approving.equals("Approved")){
            rabbitTemplate.convertAndSend("timesheet", "timesheet.approve", t.toString());
        }
        return ResponseEntity.ok("Timesheet Approved!");
    }


    @CrossOrigin
    @GetMapping("/timesheets")
    public ResponseEntity getAllTimesheets(){
        return ResponseEntity.ok(timesheetService.findAll());
    }

    @CrossOrigin
    @GetMapping("/timesheets/{id}")
    public ResponseEntity getTimesheetsByProfileId(@PathVariable String id){
        return ResponseEntity.ok(timesheetService.findByProfile_Id(id));
    }

    @CrossOrigin
    @PostMapping("/timesheets/{id}")
    public ResponseEntity updateTimesheet(@PathVariable String id, @RequestBody Timesheets weeklyTimesheets){
        timesheetService.updateTimesheet(id, weeklyTimesheets);
        return ResponseEntity.ok("Save Succeed!");
    }

    @CrossOrigin
    @PostMapping("/template/{id}")
    public ResponseEntity updateTemplate(@PathVariable String id, @RequestBody List<DailyTimesheet> template){
        profileService.updateTemplate(id, template);
        return ResponseEntity.ok("Update Succeed!");
    }

    @CrossOrigin
    @GetMapping("/weeklytimesheet")
    public ResponseEntity getWeeklyTimesheet(@RequestParam("id") String id, @RequestParam("weekEnding") String weekEnding) {
        return ResponseEntity.ok(timesheetService.findByProfile_IdAndWeeklyTimesheets_WeekEnding(id, weekEnding));
    }

    @CrossOrigin
    @PostMapping(path = "/fileUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") String id, @RequestParam("weekEnding") String weekEnding) {
        System.out.println(file);
        return this.amazonClient.uploadFile(file, id, weekEnding);

    }

    @CrossOrigin
    @GetMapping("/defaulttimesheets")
    public ResponseEntity generateTimesheet(@RequestParam("weekEnding") String weekEnding1) throws ParseException {
        String weekEnding = weekEnding1;
        List<Profile> profileList = profileService.findAll();
        for(Profile p : profileList){
            Timesheets weeklyTimesheet = new Timesheets();
            weeklyTimesheet.setWeekEnding(weekEnding);
            weeklyTimesheet.setTotalCompensatedHours(0);
            weeklyTimesheet.setTotalBillingHours(0);
            weeklyTimesheet.setSubmissionStatus("Not Started");
            weeklyTimesheet.setApprovedStatus("N/A");
            weeklyTimesheet.setFloatingDayUsed(0);
            weeklyTimesheet.setVacationDayUse(0);
            weeklyTimesheet.setHolidayUsed(0);
            List<DailyTimesheet> template = p.getTemplate();
            weeklyTimesheet.setDailyTimesheets(CurrentTime.setAllDateByWeekEnd(template, weekEnding));
            Document d = new Document();
            d.setTitle("");
            d.setType("");
            d.setUploadedBy(p.getName());
            d.setUploadedTime("");
            d.setUrl("");
            weeklyTimesheet.setDocument(d);
            timesheetService.save(Timesheet.builder().profile(p).weeklyTimesheets(weeklyTimesheet).build());
        }

        return ResponseEntity.ok("Generation succeed!");

    }






}
