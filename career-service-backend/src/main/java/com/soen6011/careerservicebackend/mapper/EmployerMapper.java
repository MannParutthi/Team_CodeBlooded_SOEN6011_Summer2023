package com.soen6011.careerservicebackend.mapper;

import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.model.User;
import com.soen6011.careerservicebackend.response.LoginResponse;

public class EmployerMapper implements UserMapper {
    @Override
    public LoginResponse mapUserToLoginResponse(User user) {
        Employer employer = (Employer) user;

        LoginResponse response = new LoginResponse();
        response.setUser(employer);

        return response;
    }
}