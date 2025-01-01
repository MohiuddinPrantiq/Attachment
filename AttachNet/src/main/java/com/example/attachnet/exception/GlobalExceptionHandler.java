package com.example.attachnet.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();

        // Handle field errors
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        // Handle global errors (including @ValidInstitutionalEmail)
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                errors.put("email", error.getDefaultMessage())
        );

        response.put("errors", errors);
        response.put("status", "error");
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String, Object>> handleCustomValidation(ValidationException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("errors", ex.getErrors());
        response.put("status", "error");
        return ResponseEntity.badRequest().body(response);
    }
}
