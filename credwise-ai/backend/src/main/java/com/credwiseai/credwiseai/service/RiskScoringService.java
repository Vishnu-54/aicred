package com.credwiseai.credwiseai.service;

import com.credwiseai.credwiseai.dto.RiskScoreRequestDto;
import com.credwiseai.credwiseai.dto.RiskScoreResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RiskScoringService {
    private final FraudDetectionService fraudDetectionService;
    private final AiExplanationService aiExplanationService;

    public RiskScoringService(FraudDetectionService fraudDetectionService, AiExplanationService aiExplanationService) {
        this.fraudDetectionService = fraudDetectionService;
        this.aiExplanationService = aiExplanationService;
    }

    public RiskScoreResponseDto calculateRiskScore(RiskScoreRequestDto request) {
        double salary = safeDouble(request.getSalary());
        int creditScore = safeInt(request.getCreditScore());
        int existingLoans = safeInt(request.getExistingLoans());
        int missedEmi = safeInt(request.getMissedEmi());
        double requestedAmount = safeDouble(request.getRequestedAmount());

        int riskScore = 55;
        List<String> reasons = new ArrayList<>();

        if (creditScore >= 760) {
            riskScore += 18;
            reasons.add("Strong bureau score supports a high-confidence approval path.");
        } else if (creditScore >= 680) {
            riskScore += 10;
            reasons.add("Credit score is within an acceptable lending band.");
        } else if (creditScore >= 600) {
            riskScore -= 6;
            reasons.add("Credit score needs manual review before final sanction.");
        } else {
            riskScore -= 20;
            reasons.add("Low credit score materially increases default probability.");
        }

        double loanToIncome = salary > 0 ? requestedAmount / salary : 99;
        if (loanToIncome <= 1.5) {
            riskScore += 12;
            reasons.add("Requested amount is proportionate to annual income.");
        } else if (loanToIncome <= 3) {
            riskScore += 4;
            reasons.add("Requested amount is manageable but should be monitored.");
        } else if (loanToIncome <= 5) {
            riskScore -= 10;
            reasons.add("Requested amount is high compared with income.");
        } else {
            riskScore -= 22;
            reasons.add("Loan request is substantially above stated income.");
        }

        if (existingLoans <= 1) {
            riskScore += 8;
            reasons.add("Low active loan exposure improves affordability.");
        } else if (existingLoans <= 3) {
            riskScore -= 4;
            reasons.add("Existing loans create moderate repayment pressure.");
        } else {
            riskScore -= 14;
            reasons.add("High number of active loans increases leverage risk.");
        }

        if (missedEmi == 0) {
            riskScore += 7;
            reasons.add("No recent missed EMI history reported.");
        } else if (missedEmi <= 2) {
            riskScore -= 10;
            reasons.add("Missed EMI history requires repayment behavior review.");
        } else {
            riskScore -= 24;
            reasons.add("Repeated missed EMIs indicate elevated delinquency risk.");
        }

        List<String> fraudFlags = fraudDetectionService.detect(salary, creditScore, existingLoans, missedEmi, requestedAmount);
        riskScore -= fraudFlags.size() * 6;
        riskScore = Math.max(0, Math.min(100, riskScore));

        String decision = determineDecision(riskScore, fraudFlags);
        String explanation = aiExplanationService.explain(riskScore, decision, reasons, fraudFlags);

        RiskScoreResponseDto response = new RiskScoreResponseDto();
        response.setRiskScore(riskScore);
        response.setDecision(decision);
        response.setReasons(reasons);
        response.setFraudFlags(fraudFlags);
        response.setExplanation(explanation);
        return response;
    }

    private String determineDecision(int riskScore, List<String> fraudFlags) {
        if (fraudFlags.size() >= 3 || riskScore < 45) {
            return "REJECTED";
        }
        if (!fraudFlags.isEmpty() || riskScore < 72) {
            return "REVIEW";
        }
        return "APPROVED";
    }

    private int safeInt(Integer value) {
        return value == null ? 0 : value;
    }

    private double safeDouble(Double value) {
        return value == null ? 0 : value;
    }
}
