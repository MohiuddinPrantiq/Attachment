package com.example.attachnet.validation;

import com.example.attachnet.dto.UserDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CustomEmailValidator implements ConstraintValidator<ValidInstitutionalEmail, UserDTO> {

    private static final String STUDENT_DOMAIN = "student.cuet.ac.bd";
    private static final String TEACHER_DOMAIN = "cuet.ac.bd";
    private static final int STUDENT_ROLE = 1; // Assuming 1 is student role
    private static final int TEACHER_ROLE = 2; // Assuming 2 is teacher role

    @Override
    public boolean isValid(UserDTO userDTO, ConstraintValidatorContext context) {
        if (userDTO.getEmail() == null || userDTO.getRole() == null) {
            return false;
        }

        String email = userDTO.getEmail().toLowerCase();

        if (userDTO.getRole().equals(STUDENT_ROLE)) {
            return email.endsWith("@" + STUDENT_DOMAIN);
        } else if (userDTO.getRole().equals(TEACHER_ROLE)) {
            return email.endsWith("@" + TEACHER_DOMAIN);
        }

        return false;
    }
}