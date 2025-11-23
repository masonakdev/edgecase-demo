package rip.edgecase.incidents.controller;

import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rip.edgecase.incidents.dto.CreateIncidentRequest;
import rip.edgecase.incidents.dto.IncidentDto;
import rip.edgecase.incidents.dto.IncidentSummaryDto;
import rip.edgecase.incidents.dto.ModeratorUpdateIncidentRequest;
import rip.edgecase.incidents.service.IncidentService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @PostMapping("/submit")
    public ResponseEntity<IncidentDto> submitIncident(
            @Valid @RequestBody CreateIncidentRequest request
    ) {
        IncidentDto created = incidentService.submitIncident(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/public")
    public List<IncidentSummaryDto> getPublicIncidents(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String objectType,
            @RequestParam(required = false) String jumpType,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate
    ) {
        return incidentService.searchPublicIncidents(
                category,
                objectType,
                jumpType,
                fromDate,
                toDate
        );
    }

    @GetMapping("/moderation/queue")
    public List<IncidentSummaryDto> getModerationQueue() {
        return incidentService.getModerationQueue();
    }

    @GetMapping("/moderation/{id}")
    public IncidentDto getIncidentForModeration(@PathVariable Long id) {
        return incidentService.getIncident(id);
    }

    @PutMapping("/moderation/{id}")
    public IncidentDto updateIncidentForModeration(
            @PathVariable Long id,
            @Valid @RequestBody ModeratorUpdateIncidentRequest request
    ) {
        return incidentService.updateIncidentForModeration(id, request);
    }

    @PostMapping("/moderation/{id}/approve")
    public IncidentDto approveIncident(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String reviewer = authentication != null ? authentication.getName() : "unknown";
        return incidentService.approveIncident(id, reviewer);
    }

    @PostMapping("/moderation/{id}/retract")
    public IncidentDto retractIncident(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String reviewer = authentication != null ? authentication.getName() : "unknown";
        return incidentService.retractIncident(id, reviewer);
    }

}