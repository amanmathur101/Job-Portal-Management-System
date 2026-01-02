package com.jobportal.controller;

import com.jobportal.config.SecureUser;
import com.jobportal.dto.AuthRequest;
import com.jobportal.dto.AuthResponse;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import com.jobportal.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "*") // Allow all for simplicity
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@jakarta.validation.Valid @RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);
        SecureUser secureUser = new SecureUser(savedUser);

        String token = jwtUtils.generateToken(secureUser);

        return ResponseEntity.ok(new AuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail(),
                savedUser.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecureUser secureUser = (SecureUser) authentication.getPrincipal();
        String token = jwtUtils.generateToken(secureUser);
        User user = secureUser.getUser();

        return ResponseEntity
                .ok(new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }
}
