package com.soen6011.careerservicebackend.controller;

import com.soen6011.careerservicebackend.common.Authority;
import com.soen6011.careerservicebackend.model.Application;
import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.model.Job;
import com.soen6011.careerservicebackend.request.LoginRequest;
import com.soen6011.careerservicebackend.response.LoadFile;
import com.soen6011.careerservicebackend.response.LoginResponse;
import com.soen6011.careerservicebackend.service.BaseService;
import com.soen6011.careerservicebackend.service.CandidateService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import com.soen6011.careerservicebackend.service.JobService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/candidate")
@CrossOrigin("http://localhost:4200")
public class CandidateController {

    private final CandidateService candidateService;

    private final BaseService baseService;

    private final JobService jobService;

    public CandidateController(CandidateService candidateService, BaseService baseService, JobService jobService) {
        this.candidateService = candidateService;
        this.baseService = baseService;
        this.jobService = jobService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = baseService.login(request, Authority.ROLE_CANDIDATE);

        if (response.getErrorMessage()!=null) {
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signUp(@Valid @RequestBody Candidate candidateToSignUp) {
        LoginResponse response = baseService.signUp(candidateToSignUp, Authority.ROLE_CANDIDATE);

        if (response.getErrorMessage()!=null) {
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/{candidateId}/jobs/{jobId}/apply")
    public ResponseEntity<String> applyForJob(@PathVariable String candidateId, @PathVariable String jobId) {
        boolean isApplied = candidateService.applyForJob(candidateId, jobId);
        if (isApplied) {
            return new ResponseEntity<>("Job application submitted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to submit job application", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{candidateId}/applications")
    public ResponseEntity<List<Application>> getCandidateApplications(@PathVariable String candidateId) {
        List<Application> applications = candidateService.getCandidateApplications(candidateId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{candidateId}/resume/exists")
    public ResponseEntity<Boolean> doesResumeExist(@PathVariable String candidateId) {
        boolean resumeExists = candidateService.checkResumeExistence(candidateId);
        return new ResponseEntity<>(resumeExists, HttpStatus.OK);
    }

    @GetMapping("/alljobs")
    public ResponseEntity<Page<Job>> getAllJobs(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) {
    	Pageable pageable = PageRequest.of(page, size);
        Page<Job> jobs = jobService.getAllJobs(pageable);
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/{candidateId}/resume/download")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String candidateId) throws IOException {
        LoadFile loadFile = candidateService.downloadCandidateResume(candidateId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType() ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + loadFile.getFilename() + "\"")
                .body(new ByteArrayResource(loadFile.getFile()));
    }

    @PostMapping("/{candidateId}/resume/upload")
    public ResponseEntity<String> uploadResume(@PathVariable String candidateId,
                                               @RequestParam("file") MultipartFile file) throws IOException {
        candidateService.uploadCandidateResume(candidateId, file);
        return new ResponseEntity<>("Resume uploaded successfully", HttpStatus.OK);
    }

}
