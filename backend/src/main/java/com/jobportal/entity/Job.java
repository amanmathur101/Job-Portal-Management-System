package com.jobportal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    @Column(nullable = false, length = 1000)
    @NotBlank(message = "Description is required")
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "Location is required")
    private String location;

    private LocalDate postedDate = LocalDate.now();

    // Manual Constructors
    public Job() {
    }

    public Job(Long id, String title, String description, String location, LocalDate postedDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.postedDate = postedDate;
    }

    // Manual Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }
}
