package com.group2.authserver.Domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "User")
@Getter
@Setter
@ToString
@AllArgsConstructor
public class User implements Serializable, UserDetails {

    @Transient
    private final Set<GrantedAuthority> authorities = new HashSet<>();

    @Transient
    private List<String> roles = new ArrayList<>();

    public User() {
        authorities.add(new SimpleGrantedAuthority("USER"));
        // ... add further roles if required
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "profile_id")
    private String profile_id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
