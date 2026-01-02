package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return Objects.requireNonNull(jobRepository.save(job));
    }

    public Job updateJob(long id, Job jobDetails) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setLocation(jobDetails.getLocation());
        return Objects.requireNonNull(jobRepository.save(job));
    }

    public void deleteJob(long id) {
        jobRepository.deleteById(id);
    }
}
