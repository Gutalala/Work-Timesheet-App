package com.example.timesheetserver.Util;

import com.example.timesheetserver.Domain.DailyTimesheet;
import com.example.timesheetserver.Domain.Timesheet;
import com.example.timesheetserver.Domain.Timesheets;
import de.jollyday.Holiday;
import de.jollyday.HolidayCalendar;
import de.jollyday.HolidayManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class CurrentTime {

    public static String getCurrentTime(){
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.applyPattern("yyyy-MM-dd'T'HH:mm'Z'");
        Date date = new Date();
        return sdf.format(date);

    }

    public static boolean compareDay(String currentDay){
        HolidayManager m = HolidayManager.getInstance(HolidayCalendar.UNITED_STATES);
        Set<Holiday> holidays = m.getHolidays(2021, "ny");
        for(Holiday h: holidays){
            System.out.println(h);
            if(currentDay.equals(String.valueOf(h.getDate()))){
                return true;
            }
        }
        return false;
    }

    public static List<DailyTimesheet> setAllDateByWeekEnd(List<DailyTimesheet> template, String currentTime) throws ParseException {
        for(DailyTimesheet dailyTimesheet: template){
            if(dailyTimesheet.getDay().equals("Sunday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-6, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-6, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Monday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-5, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-5, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Tuesday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-4, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-4, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Wednesday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-3, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-3, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Thursday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-2, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-2, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Friday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(-1, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(-1, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
            if(dailyTimesheet.getDay().equals("Saturday")){
                dailyTimesheet.setDate(CurrentTime.generateDayByCurrentIso(0, currentTime));
                dailyTimesheet.setHoliday(false);
                dailyTimesheet.setFloatingDay(false);
                if(compareDay(CurrentTime.generateDayByCurrent(0, currentTime))){
                    dailyTimesheet.setHoliday(true);
                }
            }
        }
        return template;
    }

    public static String generateDayByCurrent(int move, String currentTime) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        String dateInString = currentTime;
        Date date = formatter.parse(dateInString);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.add(Calendar.DATE, move);

        date = calendar.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.applyPattern("yyyy-MM-dd");


        return sdf.format(date);
    }

    public static String generateDayByCurrentIso(int move, String currentTime) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        String dateInString = currentTime;
        Date date = formatter.parse(dateInString);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.add(Calendar.DATE, move);

        date = calendar.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat();
        sdf.applyPattern("yyyy-MM-dd'T'HH:mm:ss.sss'Z'");


        return sdf.format(date);
    }
}
