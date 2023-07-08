package com.soen6011.careerservicebackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carrers")
public class CarrerController {

    public static Boolean getCarrers() {
        return Boolean.TRUE;
    }

}
