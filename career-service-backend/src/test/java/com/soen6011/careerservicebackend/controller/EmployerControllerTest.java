package com.soen6011.careerservicebackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

class EmployerControllerTest {

    @Test
    public void testGetEmployers() {
        Boolean bool = EmployerController.getEmployers();
        Assert.isTrue(bool.booleanValue());
    }
}