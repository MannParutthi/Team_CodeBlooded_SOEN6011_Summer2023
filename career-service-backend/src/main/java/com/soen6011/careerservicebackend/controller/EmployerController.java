package com.soen6011.careerservicebackend.controller;

import com.soen6011.careerservicebackend.common.Authority;
import com.soen6011.careerservicebackend.model.Candidate;
import com.soen6011.careerservicebackend.model.Employer;
import com.soen6011.careerservicebackend.model.Job;
import com.soen6011.careerservicebackend.request.LoginRequest;
import com.soen6011.careerservicebackend.response.JobApplicationsResponse;
import com.soen6011.careerservicebackend.response.LoginResponse;
import com.soen6011.careerservicebackend.service.ApplicationService;
import com.soen6011.careerservicebackend.service.BaseService;
import com.soen6011.careerservicebackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/employer")
@CrossOrigin("http://localhost:4200")
public class EmployerController {

    //TODO: For CICD test - will be deleted
    public static Boolean getEmployers() {
        return Boolean.TRUE;
    }

    private final JobService jobService;

    private final ApplicationService applicationService;

    private final BaseService baseService;

    @Autowired
    public EmployerController(JobService jobService, ApplicationService applicationService, BaseService baseService) {
        this.jobService = jobService;
        this.applicationService = applicationService;
        this.baseService = baseService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = baseService.login(request, Authority.ROLE_EMPLOYER);

        if (response.getErrorMessage()!=null) {
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signUp(@Valid @RequestBody Employer employerToSignUp) {
        LoginResponse response = baseService.signUp(employerToSignUp, Authority.ROLE_EMPLOYER);

        if (response.getErrorMessage()!=null) {
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/jobs")
    public ResponseEntity<String> addJob(@Valid @RequestBody Job job) {
        jobService.addJob(job);
        return new ResponseEntity<>("Job added successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable String jobId) {
        jobService.deleteJob(jobId);
        return new ResponseEntity<>("Job deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<String> updateJob(@PathVariable String jobId, @RequestBody Job updatedJob) {
        jobService.updateJob(jobId, updatedJob);
        return new ResponseEntity<>("Job updated successfully", HttpStatus.OK);
    }

    @GetMapping("/{employerId}/jobs")
    public ResponseEntity<Page<Job>> getJobsByEmployer(@PathVariable String employerId,
                                                       @RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Job> jobs = jobService.getJobsByEmployer(employerId, pageable);
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/{employerId}/{jobId}/applications")
    public ResponseEntity<JobApplicationsResponse> getApplicationsForJob(@PathVariable String employerId,
                                                                         @PathVariable String jobId,
                                                                         @RequestParam(defaultValue = "0") Integer page,
                                                                         @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Candidate> candidates = applicationService.getCandidateApplications(employerId, jobId, pageable);

        JobApplicationsResponse response = new JobApplicationsResponse();
        response.setJobId(jobId);
        response.setCandidates(candidates);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
