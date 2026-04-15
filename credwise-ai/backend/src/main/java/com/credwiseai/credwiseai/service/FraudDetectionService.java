package com.credwiseai.credwiseai.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FraudDetectionService {
    public List<String> detect(double salary, int creditScore, int existingLoans, int missedEmi, double requestedAmount) {
        List<String> flags = new ArrayList<>();
        double requestToIncome = salary > 0 ? requestedAmount / salary : 99;

        if (requestToIncome > 4) {
            flags.add("Requested amount is unusually high compared with declared salary.");
        }
        if (existingLoans > 4) {
            flags.add("Applicant has too many concurrent loan obligations.");
        }
        if (missedEmi >= 3) {
            flags.add("Repeated EMI defaults detected in repayment history.");
        }
        if (creditScore < 600 && requestToIncome > 2.5) {
            flags.add("Low credit score combined with an aggressive loan request.");
        }

        return flags;
    }
}
