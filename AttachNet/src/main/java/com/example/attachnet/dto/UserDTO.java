package com.example.attachnet.dto;

import com.example.attachnet.validation.ValidInstitutionalEmail;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@ValidInstitutionalEmail
public class UserDTO {
    private Long id;

    @NotNull(message = "Role is required")
    private Integer role;

    @NotBlank(message = "Academic ID is required")
    @Pattern(regexp = "^[A-Z0-9]+$", message = "Academic ID must contain only uppercase letters and numbers")
    private String academicId;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
            message = "Password must contain at least one digit, one lowercase, one uppercase, and one special character")
    private String password;

    @NotBlank(message = "Department is required")
    @Size(min = 2, max = 50, message = "Department must be between 2 and 50 characters")
    private String department;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
    private String phone;

    @NotBlank(message = "Batch is required")
    @Pattern(regexp = "^[0-9]{4}$", message = "Batch must be a 4-digit year")
    private String batch;


    public String getAcademicId() {
        return academicId;
    }

    public String getPassword() {
        return password;
    }

    public String getDepartment() {
        return department;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getId() {
        return id;
    }

    public String getBatch() {
        return batch;
    }

    public String getPhone() {
        return phone;
    }


    public Integer getRole() {
        return role;
    }


    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

}