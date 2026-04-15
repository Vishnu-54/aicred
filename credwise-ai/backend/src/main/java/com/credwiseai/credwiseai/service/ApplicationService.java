package com.credwiseai.credwiseai.service;

import com.credwiseai.credwiseai.dto.ApplicationRequestDto;
import com.credwiseai.credwiseai.dto.ApplicationResponseDto;
import com.credwiseai.credwiseai.dto.RiskScoreRequestDto;
import com.credwiseai.credwiseai.dto.RiskScoreResponseDto;
import com.credwiseai.credwiseai.entity.LoanApplication;
import com.credwiseai.credwiseai.repository.LoanApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ApplicationService {
    private final LoanApplicationRepository repository;
    private final RiskScoringService riskScoringService;

    public ApplicationService(LoanApplicationRepository repository, RiskScoringService riskScoringService) {
        this.repository = repository;
        this.riskScoringService = riskScoringService;
    }

    public List<ApplicationResponseDto> findAll() {
        return repository.findAll().stream()
                .sorted(Comparator.comparing(LoanApplication::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    public ApplicationResponseDto create(ApplicationRequestDto request) {
        RiskScoreRequestDto riskRequest = new RiskScoreRequestDto();
        riskRequest.setSalary(request.getSalary());
        riskRequest.setCreditScore(request.getCreditScore());
        riskRequest.setExistingLoans(request.getExistingLoans());
        riskRequest.setMissedEmi(request.getMissedEmi());
        riskRequest.setRequestedAmount(request.getRequestedAmount());
        RiskScoreResponseDto risk = riskScoringService.calculateRiskScore(riskRequest);

        LoanApplication application = new LoanApplication();
        application.setApplicantName(request.getApplicantName());
        application.setEmail(request.getEmail());
        application.setPhone(request.getPhone());
        application.setEmploymentType(request.getEmploymentType());
        application.setEmployerName(request.getEmployerName());
        application.setSalary(request.getSalary());
        application.setCreditScore(request.getCreditScore());
        application.setExistingLoans(request.getExistingLoans());
        application.setMissedEmi(request.getMissedEmi());
        application.setRequestedAmount(request.getRequestedAmount());
        application.setLoanPurpose(request.getLoanPurpose());
        application.setTenureMonths(request.getTenureMonths());
        application.setRiskScore(risk.getRiskScore());
        application.setDecision(risk.getDecision());
        application.setReasons(risk.getReasons());
        application.setFraudFlags(risk.getFraudFlags());
        application.setExplanation(risk.getExplanation());

        return toResponse(repository.save(application));
    }

    private ApplicationResponseDto toResponse(LoanApplication application) {
        ApplicationResponseDto response = new ApplicationResponseDto();
        response.setId(application.getId());
        response.setApplicantName(application.getApplicantName());
        response.setEmail(application.getEmail());
        response.setPhone(application.getPhone());
        response.setEmploymentType(application.getEmploymentType());
        response.setEmployerName(application.getEmployerName());
        response.setSalary(application.getSalary());
        response.setCreditScore(application.getCreditScore());
        response.setExistingLoans(application.getExistingLoans());
        response.setMissedEmi(application.getMissedEmi());
        response.setRequestedAmount(application.getRequestedAmount());
        response.setLoanPurpose(application.getLoanPurpose());
        response.setTenureMonths(application.getTenureMonths());
        response.setRiskScore(application.getRiskScore());
        response.setDecision(application.getDecision());
        response.setReasons(application.getReasons());
        response.setFraudFlags(application.getFraudFlags());
        response.setExplanation(application.getExplanation());
        response.setCreatedAt(application.getCreatedAt());
        return response;
    }
}
