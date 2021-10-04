package com.example.summaryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SummaryServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SummaryServerApplication.class, args);
    }

}
