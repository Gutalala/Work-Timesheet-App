package com.example.profileserver.DAO;

import com.example.profileserver.Domain.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends MongoRepository<Profile, String> {
    List<Profile> findAll();
    Optional<Profile> findById(String id);
}