package com.credwiseai.credwiseai.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ApplicationRequestDto {
    @NotBlank
    private String applicantName;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotBlank
    private String employmentType;
    private String employerName;
    @NotNull
    @Positive
    private Double salary;
    @NotNull
    @Min(300)
    @Max(900)
    private Integer creditScore;
    @NotNull
    @Min(0)
    private Integer existingLoans;
    @NotNull
    @Min(0)
    private Integer missedEmi;
    @NotNull
    @Positive
    private Double requestedAmount;
    @NotBlank
    private String loanPurpose;
    @NotNull
    @Min(6)
    private Integer tenureMonths;

    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmploymentType() { return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }
    public String getEmployerName() { return employerName; }
    public void setEmployerName(String employerName) { this.employerName = employerName; }
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
    public Integer getCreditScore() { return creditScore; }
    public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
    public Integer getExistingLoans() { return existingLoans; }
    public void setExistingLoans(Integer existingLoans) { this.existingLoans = existingLoans; }
    public Integer getMissedEmi() { return missedEmi; }
    public void setMissedEmi(Integer missedEmi) { this.missedEmi = missedEmi; }
    public Double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(Double requestedAmount) { this.requestedAmount = requestedAmount; }
    public String getLoanPurpose() { return loanPurpose; }
    public void setLoanPurpose(String loanPurpose) { this.loanPurpose = loanPurpose; }
    public Integer getTenureMonths() { return tenureMonths; }
    public void setTenureMonths(Integer tenureMonths) { this.tenureMonths = tenureMonths; }
}
