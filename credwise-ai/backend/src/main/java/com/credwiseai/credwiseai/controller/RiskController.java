package com.credwiseai.credwiseai.controller;

import com.credwiseai.credwiseai.dto.RiskScoreRequestDto;
import com.credwiseai.credwiseai.dto.RiskScoreResponseDto;
import com.credwiseai.credwiseai.service.RiskScoringService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/risk")
public class RiskController {
    private final RiskScoringService riskScoringService;

    public RiskController(RiskScoringService riskScoringService) {
        this.riskScoringService = riskScoringService;
    }

    @PostMapping("/score")
    public RiskScoreResponseDto score(@RequestBody RiskScoreRequestDto request) {
        return riskScoringService.calculateRiskScore(request);
    }
}
