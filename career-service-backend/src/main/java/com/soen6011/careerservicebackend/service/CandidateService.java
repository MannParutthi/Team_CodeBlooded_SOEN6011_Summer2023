package com.soen6011.careerservicebackend.service;

import com.soen6011.careerservicebackend.common.ApplicationStatus;
import com.soen6011.careerservicebackend.exception.ResourceNotFoundException;
import com.soen6011.careerservicebackend.model.Application;
import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.model.Job;
import com.soen6011.careerservicebackend.repository.ApplicationRepository;
import com.soen6011.careerservicebackend.repository.CandidateRepository;
import com.soen6011.careerservicebackend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    private final JobRepository jobRepository;

    private final ApplicationRepository applicationRepository;

    public CandidateService(CandidateRepository candidateRepository, JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public List<Candidate> getCandidatesByIds(List<String> candidateIds) {
        return (List<Candidate>) candidateRepository.findAllById(candidateIds);
    }

    public boolean applyForJob(String candidateId, String jobId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (applicationRepository.existsByJobIdAndCandidateId(jobId, candidateId)) {
            return false;
        }

        Application application = new Application();
        application.setJobId(jobId);
        application.setEmployerId(job.getEmployerId());
        application.setCandidateId(candidateId);
        application.setStatus(ApplicationStatus.APPLIED);

        applicationRepository.save(application);

        return true;
    }

    public List<Application> getCandidateApplications(String candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found"));

        return applicationRepository.findByCandidateId(candidateId);
    }

    public boolean checkResumeExistence(String candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found"));
        return candidate.getResume() != null;
    }

}
