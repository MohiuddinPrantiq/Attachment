package com.example.attachnet.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = CustomEmailValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidInstitutionalEmail {
    String message() default "Invalid institutional email format";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}