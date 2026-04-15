package com.credwiseai.credwiseai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequestDto {
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 8)
    private String password;
    private String institution;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
}
