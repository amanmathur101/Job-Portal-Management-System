package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.service.JobService;
import com.jobportal.util.JwtUtils;
import com.jobportal.service.CustomUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest(JobController.class)
public class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllJobs() throws Exception {
        Job job1 = new Job(1L, "Dev", "Desc", "Loc", null);
        Job job2 = new Job(2L, "QA", "Desc", "Loc", null);
        List<Job> jobs = Arrays.asList(job1, job2);

        Mockito.when(jobService.getAllJobs()).thenReturn(jobs);

        mockMvc.perform(get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @SuppressWarnings("null")
    public void testCreateJob() throws Exception {
        Job job = new Job(null, "New Job", "Desc", "Remote", null);
        Job savedJob = new Job(1L, "New Job", "Desc", "Remote", null);

        Mockito.when(jobService.createJob(Mockito.any(Job.class))).thenReturn(savedJob);

        mockMvc.perform(post("/api/jobs")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(job)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }
}
