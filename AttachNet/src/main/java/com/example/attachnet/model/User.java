package com.example.attachnet.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer role; // 1 : student, 2 : teacher

    @Column(name = "academic_id", nullable = false, unique = true)
    private String academicId; // stores both student and teacher IDs

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false, length = 15)
    private String phone;

    @Column(nullable = false)
    private String batch;



    public void setRole(Integer role) {
        this.role = role;
    }

    public void setAcademicId(String academicId) {
        this.academicId = academicId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public Integer getRole() {
        return role;
    }

    public String getAcademicId() {
        return academicId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getDepartment() {
        return department;
    }

    public String getPhone() {
        return phone;
    }

    public String getBatch() {
        return batch;
    }
}