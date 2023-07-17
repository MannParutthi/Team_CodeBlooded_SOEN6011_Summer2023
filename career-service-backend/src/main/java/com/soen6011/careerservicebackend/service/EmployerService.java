package com.soen6011.careerservicebackend.service;

import com.soen6011.careerservicebackend.exception.ResourceNotFoundException;
import com.soen6011.careerservicebackend.mapper.EmployerMapper;
import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.repository.EmployerRepository;
import com.soen6011.careerservicebackend.request.EmployerUpdateRequest;
import com.soen6011.careerservicebackend.response.EmployerProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

    @Autowired
    EmployerMapper employerMapper;


    @Autowired
    EmployerRepository employerRepository;

    public EmployerProfileResponse getProfileCard(String employerId) {

        Employer employer = employerRepository.findById(employerId).orElseThrow(() -> new ResourceNotFoundException("Employer not found"));

        return employerMapper.toEmployerProfileResponse(employer);
    }

    public EmployerProfileResponse updateProfile(String employerId, EmployerUpdateRequest userUpdateRequest) {

        Employer employer = employerRepository.findById(employerId).orElseThrow(() -> new ResourceNotFoundException("Employer not found"));

        Employer updatedEmployer = employerMapper.fromEmployerUpdateRequest(employer,userUpdateRequest);

        employerRepository.save(updatedEmployer);

        return employerMapper.toEmployerProfileResponse(updatedEmployer);

    }
}
