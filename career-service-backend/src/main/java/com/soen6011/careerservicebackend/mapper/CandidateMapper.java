package com.soen6011.careerservicebackend.mapper;

import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.model.User;
import com.soen6011.careerservicebackend.response.LoginResponse;
import org.springframework.stereotype.Component;

@Component
public class CandidateMapper implements UserMapper {
    @Override
    public LoginResponse mapUserToLoginResponse(User user) {
        Candidate candidate = (Candidate) user;

        LoginResponse response = new LoginResponse();
        response.setUser(candidate);

        return response;
    }

}
