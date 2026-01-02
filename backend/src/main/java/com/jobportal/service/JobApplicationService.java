package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public void applyForJob(long userId, long jobId) {
        if (jobApplicationRepository.findByUserIdAndJobId(userId, jobId).isPresent()) {
            throw new RuntimeException("Already applied to this job");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication application = new JobApplication();
        application.setUser(user);
        application.setJob(job);

        jobApplicationRepository.save(application);
    }

    public List<JobApplication> getApplicationsByUserId(Long userId) {
        return jobApplicationRepository.findByUserId(userId);
    }

    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }
}
