package com.jobportal.controller;

import com.jobportal.config.SecureUser;
import com.jobportal.entity.JobApplication;
import com.jobportal.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
// @CrossOrigin(origins = "*") // Allow all
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping("/apply/{jobId}")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<String> applyForJob(@PathVariable Long jobId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        SecureUser secureUser = (SecureUser) auth.getPrincipal();
        Long userId = secureUser.getUser().getId();

        try {
            jobApplicationService.applyForJob(userId, jobId);
            return ResponseEntity.ok("Applied successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public List<JobApplication> getMyApplications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        SecureUser secureUser = (SecureUser) auth.getPrincipal(); // Assuming auth principle is SecureUser
        return jobApplicationService.getApplicationsByUserId(secureUser.getUser().getId());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<JobApplication> getAllApplications() {
        return jobApplicationService.getAllApplications();
    }
}
