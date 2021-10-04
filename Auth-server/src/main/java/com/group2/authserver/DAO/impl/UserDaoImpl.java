package com.group2.authserver.DAO.impl;


import com.group2.authserver.DAO.AbstractHibernateDao;
import com.group2.authserver.DAO.UserDao;
import com.group2.authserver.Domain.User;
import org.hibernate.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl extends AbstractHibernateDao<User> implements UserDao {
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



    @Override
    public Optional<User> findUserByUsername(String username) {
        Optional<User> user = null;
        String sql = "FROM User WHERE username = '" + username + "'";
        Query query = sessionFactory.getCurrentSession().createQuery(sql);
        try {
            List<User> users = query.getResultList();
            user = users.isEmpty() ? Optional.empty() : Optional.of( users.get(0) );
        } catch (NoResultException e) {
            System.out.println("User does not exists using username");
        }
        return user;

    }

}
