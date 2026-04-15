package com.credwiseai.credwiseai.service;

import com.credwiseai.credwiseai.dto.AuthRequestDto;
import com.credwiseai.credwiseai.dto.AuthResponseDto;
import com.credwiseai.credwiseai.dto.RegisterRequestDto;
import com.credwiseai.credwiseai.entity.UserAccount;
import com.credwiseai.credwiseai.exception.UnauthorizedException;
import com.credwiseai.credwiseai.repository.UserAccountRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class AuthService {
    private static final String DEFAULT_USER = "vishnu";
    private static final String DEFAULT_PASSWORD = "vishnu@123456";

    private final UserAccountRepository repository;

    public AuthService(UserAccountRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    void seedDefaultUser() {
        if (!repository.existsByUsernameIgnoreCase(DEFAULT_USER)) {
            UserAccount user = new UserAccount();
            user.setUsername(DEFAULT_USER);
            user.setPassword(DEFAULT_PASSWORD);
            user.setRole("ADMIN");
            user.setInstitution("CredWise Demo Bank");
            repository.save(user);
        }
    }

    public AuthResponseDto login(AuthRequestDto request) {
        UserAccount user = repository.findByUsernameIgnoreCase(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        return toResponse(user);
    }

    public AuthResponseDto register(RegisterRequestDto request) {
        if (repository.existsByUsernameIgnoreCase(request.getUsername())) {
            throw new IllegalArgumentException("Username is already registered");
        }

        UserAccount user = new UserAccount();
        user.setUsername(request.getUsername().trim());
        user.setPassword(request.getPassword());
        user.setInstitution(request.getInstitution() == null || request.getInstitution().isBlank()
                ? "Independent Lending Team"
                : request.getInstitution().trim());
        user.setRole("ANALYST");
        return toResponse(repository.save(user));
    }

    private AuthResponseDto toResponse(UserAccount user) {
        String tokenSource = user.getUsername() + ":" + user.getRole() + ":" + user.getId();
        String token = Base64.getEncoder().encodeToString(tokenSource.getBytes(StandardCharsets.UTF_8));
        return new AuthResponseDto(user.getId(), user.getUsername(), user.getRole(), user.getInstitution(), token);
    }
}
