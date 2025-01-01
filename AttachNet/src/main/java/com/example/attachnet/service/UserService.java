package com.example.attachnet.service;

import com.example.attachnet.dto.UserDTO;
import com.example.attachnet.exception.ValidationException;
import com.example.attachnet.model.User;
import com.example.attachnet.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User createUser(UserDTO userDTO) {
        validateUniqueFields(userDTO.getEmail(), userDTO.getAcademicId(), null);

        User user = new User();
        updateUserFromDTO(user, userDTO);
        return userRepo.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    public User updateUser(Long id, UserDTO userDTO) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        validateUniqueFields(userDTO.getEmail(), userDTO.getAcademicId(), id);
        updateUserFromDTO(user, userDTO);
        return userRepo.save(user);
    }

    private void updateUserFromDTO(User user, UserDTO userDTO) {
        user.setRole(userDTO.getRole());
        user.setAcademicId(userDTO.getAcademicId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setDepartment(userDTO.getDepartment());
        user.setPhone(userDTO.getPhone());
        user.setBatch(userDTO.getBatch());
    }

    private void validateUniqueFields(String email, String academicId, Long excludeId) {
        Map<String, String> errors = new HashMap<>();

        // Check email uniqueness
        Optional<User> existingUserEmail = userRepo.findByEmail(email);
        if (existingUserEmail.isPresent() && (excludeId == null || !existingUserEmail.get().getId().equals(excludeId))) {
            errors.put("email", "Email already exists");
        }

        // Check academic ID uniqueness
        Optional<User> existingUserAcademicId = userRepo.findByAcademicId(academicId);
        if (existingUserAcademicId.isPresent() && (excludeId == null || !existingUserAcademicId.get().getId().equals(excludeId))) {
            errors.put("academicId", "Academic ID already exists");
        }

        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }

    private void validateUniqueEmail(String email, Long excludeId) {
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isPresent() && (excludeId == null || !existingUser.get().getId().equals(excludeId))) {
            Map<String, String> errors = new HashMap<>();
            errors.put("email", "Email already exists");
            throw new ValidationException(errors);
        }
    }

    public void deleteUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepo.delete(user);
    }
}