package com.credwiseai.credwiseai.dto;

import java.util.List;

public class RiskScoreResponseDto {
    private int riskScore;
    private String decision;
    private List<String> reasons;
    private List<String> fraudFlags;
    private String explanation;

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }
    public List<String> getReasons() { return reasons; }
    public void setReasons(List<String> reasons) { this.reasons = reasons; }
    public List<String> getFraudFlags() { return fraudFlags; }
    public void setFraudFlags(List<String> fraudFlags) { this.fraudFlags = fraudFlags; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
