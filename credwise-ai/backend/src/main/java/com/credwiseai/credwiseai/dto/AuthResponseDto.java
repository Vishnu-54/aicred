package com.credwiseai.credwiseai.dto;

public class AuthResponseDto {
    private Long id;
    private String username;
    private String role;
    private String institution;
    private String token;

    public AuthResponseDto(Long id, String username, String role, String institution, String token) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.institution = institution;
        this.token = token;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
