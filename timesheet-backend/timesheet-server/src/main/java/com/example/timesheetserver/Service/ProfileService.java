package com.example.timesheetserver.Service;

import com.example.timesheetserver.DAO.ProfileRepository;
import com.example.timesheetserver.Domain.DailyTimesheet;
import com.example.timesheetserver.Domain.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    public void updateTemplate(String id, List<DailyTimesheet> template){
        Optional<Profile> optional = profileRepository.findById(id);
        optional.ifPresent(profile -> {
            profile.setTemplate(template);
            profileRepository.save(profile);
        });
    }

    public List<Profile> findAll(){
        return profileRepository.findAll();
    }
}
