package com.group2.authserver.Controller;


import com.group2.authserver.Domain.User;
import com.group2.authserver.Requests.LoginRequest;
import com.group2.authserver.Security.JwtTokenProvider;
import com.group2.authserver.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public void setJwtTokenProvider(JwtTokenProvider jwtTokenProvider){this.jwtTokenProvider = jwtTokenProvider;}

    @Autowired
    public void setUserService(UserService userService){this.userService = userService;}

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager){this.authenticationManager = authenticationManager;}

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping(value = "auth/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest){
        try {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();
//            System.out.println(passwordEncoder.encode(password));
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            List<String> roles = ((User)userService.loadUserByUsername(username)).getRoles();
            String profile_id = ((User) userService.loadUserByUsername(username)).getProfile_id();
            String token = jwtTokenProvider.createToken(username, roles);
            Map<Object, Object> model = new HashMap<>();
            model.put("profile_id", profile_id);
            model.put("token", token);
            return ResponseEntity.ok(model);
        }
        catch (AuthenticationException e){
            e.printStackTrace();
            String badUsername = loginRequest.getUsername();
            throw new BadCredentialsException("Username "  + badUsername + " is invalid.");
        }
    }
}
