package com.group2.authserver.DAO;

import com.group2.authserver.Domain.User;

import java.util.Optional;

public interface UserDao {
    Optional<User> findUserByUsername(String username);
}
