package com.soen6011.careerservicebackend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

public class CarrerControllerTest {

    @Test
    public void testGetCarrers() {
        Boolean bool = CarrerController.getCarrers();
        Assert.isTrue(bool.booleanValue());
    }
}
