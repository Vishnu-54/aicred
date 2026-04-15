package com.credwiseai.credwiseai.dto;

public class RiskScoreRequestDto {
    private Double salary;
    private Integer creditScore;
    private Integer existingLoans;
    private Integer missedEmi;
    private Double requestedAmount;

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
}
