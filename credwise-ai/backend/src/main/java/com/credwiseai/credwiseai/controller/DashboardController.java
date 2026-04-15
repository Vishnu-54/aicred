package com.credwiseai.credwiseai.controller;

import com.credwiseai.credwiseai.dto.DashboardSummaryDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary() {
        return new DashboardSummaryDto(120, 72, 28, 20, 5, 74);
    }
}
