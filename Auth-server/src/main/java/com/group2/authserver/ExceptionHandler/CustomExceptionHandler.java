package com.group2.authserver.ExceptionHandler;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity handleAllException(BadCredentialsException e){
        return ResponseEntity.ok(e.getMessage());
    }

}
