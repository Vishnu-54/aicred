package com.credwiseai.credwiseai.dto;

public class DashboardSummaryDto {
    private int totalApplications;
    private int approved;
    private int review;
    private int rejected;
    private int fraudAlerts;
    private int avgRiskScore;

    public DashboardSummaryDto(int totalApplications, int approved, int review, int rejected, int fraudAlerts, int avgRiskScore) {
        this.totalApplications = totalApplications;
        this.approved = approved;
        this.review = review;
        this.rejected = rejected;
        this.fraudAlerts = fraudAlerts;
        this.avgRiskScore = avgRiskScore;
    }

    public int getTotalApplications() { return totalApplications; }
    public void setTotalApplications(int totalApplications) { this.totalApplications = totalApplications; }
    public int getApproved() { return approved; }
    public void setApproved(int approved) { this.approved = approved; }
    public int getReview() { return review; }
    public void setReview(int review) { this.review = review; }
    public int getRejected() { return rejected; }
    public void setRejected(int rejected) { this.rejected = rejected; }
    public int getFraudAlerts() { return fraudAlerts; }
    public void setFraudAlerts(int fraudAlerts) { this.fraudAlerts = fraudAlerts; }
    public int getAvgRiskScore() { return avgRiskScore; }
    public void setAvgRiskScore(int avgRiskScore) { this.avgRiskScore = avgRiskScore; }
}
