package rip.edgecase.incidents.service;

import rip.edgecase.incidents.dto.CreateIncidentRequest;
import rip.edgecase.incidents.dto.IncidentDto;
import rip.edgecase.incidents.dto.IncidentSummaryDto;
import rip.edgecase.incidents.dto.ModeratorUpdateIncidentRequest;

import java.time.LocalDate;
import java.util.List;

public interface IncidentService {

    IncidentDto submitIncident(CreateIncidentRequest request);

    List<IncidentSummaryDto> searchPublicIncidents(
            String category,
            String objectType,
            String jumpType,
            LocalDate fromDate,
            LocalDate toDate
    );

    List<IncidentSummaryDto> getModerationQueue();

    IncidentDto approveIncident(Long id, String reviewer);

    IncidentDto retractIncident(Long id, String reviewer);

    IncidentDto getIncident(Long id);

    IncidentDto updateIncidentForModeration(Long id, ModeratorUpdateIncidentRequest request);

}