package com.example.profileserver.Service;

import com.example.profileserver.DAO.ProfileRepository;
import com.example.profileserver.Domain.Contact;
import com.example.profileserver.Domain.DailyTimesheet;
import com.example.profileserver.Domain.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    public void updateContact(String id, Contact contact){
        Optional<Profile> optional = profileRepository.findById(id);
        optional.ifPresent(profile -> {
            profile.setContact(contact);
            profileRepository.save(profile);
        });
    }
    public Optional<Profile> findById(String id){
        return profileRepository.findById(id);
    }
    public void save(Profile profile){
        profileRepository.save(profile);
    }
}