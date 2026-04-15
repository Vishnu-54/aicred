package com.credwiseai.credwiseai.controller;

import com.credwiseai.credwiseai.dto.ApplicationRequestDto;
import com.credwiseai.credwiseai.dto.ApplicationResponseDto;
import com.credwiseai.credwiseai.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<ApplicationResponseDto> list() {
        return applicationService.findAll();
    }

    @PostMapping
    public ResponseEntity<ApplicationResponseDto> create(@Valid @RequestBody ApplicationRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.create(request));
    }
}
