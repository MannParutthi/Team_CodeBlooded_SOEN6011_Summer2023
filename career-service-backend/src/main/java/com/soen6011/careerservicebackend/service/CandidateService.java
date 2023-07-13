package com.soen6011.careerservicebackend.service;

import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> getCandidatesByIds(List<String> candidateIds) {
        return (List<Candidate>) candidateRepository.findAllById(candidateIds);
    }
}
