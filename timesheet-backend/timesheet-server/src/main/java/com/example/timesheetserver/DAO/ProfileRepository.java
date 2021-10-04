package com.example.timesheetserver.DAO;

import com.example.timesheetserver.Domain.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends MongoRepository<Profile, String> {
    List<Profile> findAll();
    Optional<Profile> findById(String id);
}
