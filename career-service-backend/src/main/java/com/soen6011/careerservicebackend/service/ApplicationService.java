package com.soen6011.careerservicebackend.service;

import com.soen6011.careerservicebackend.model.Application;
import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final CandidateService candidateService;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository,CandidateService candidateService) {
        this.applicationRepository = applicationRepository;
        this.candidateService = candidateService;
    }

    public List<Candidate> getCandidateApplications(String employerId, String jobId, Pageable pageable) {
        Page<Application> applications = applicationRepository.findByEmployerIdAndJobId(employerId, jobId, pageable);
        List<String> candidateIds = applications.stream().map(Application::getCandidateId).collect(Collectors.toList());
        return candidateService.getCandidatesByIds(candidateIds);
    }
}
