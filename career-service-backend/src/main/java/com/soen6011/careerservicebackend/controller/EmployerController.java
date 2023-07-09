package com.soen6011.careerservicebackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    //TODO: For CICD test - will be deleted
    public static Boolean getEmployers() {
        return Boolean.TRUE;
    }

}
