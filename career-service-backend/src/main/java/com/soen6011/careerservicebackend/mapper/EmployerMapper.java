package com.soen6011.careerservicebackend.mapper;

import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.model.User;
import com.soen6011.careerservicebackend.request.EmployerUpdateRequest;
import com.soen6011.careerservicebackend.response.EmployerProfileResponse;
import com.soen6011.careerservicebackend.response.LoginResponse;
import org.springframework.stereotype.Component;

@Component
public class EmployerMapper implements UserMapper {
    @Override
    public LoginResponse mapUserToLoginResponse(User user) {
        Employer employer = (Employer) user;

        LoginResponse response = new LoginResponse();
        response.setUser(employer);

        return response;
    }

    public EmployerProfileResponse toEmployerProfileResponse(Employer employer) {

        EmployerProfileResponse employerProfileResponse = new EmployerProfileResponse();
        employerProfileResponse.setWebsite(employer.getWebsite());
        employerProfileResponse.setCompanyName(employer.getCompanyName());
        return employerProfileResponse;
    }

    public Employer fromEmployerUpdateRequest(Employer employer, EmployerUpdateRequest employerUpdateRequest) {

        employer.setCompanyName(employerUpdateRequest.getCompanyName());
        employer.setWebsite(employerUpdateRequest.getWebsite());
        return employer;
    }
}