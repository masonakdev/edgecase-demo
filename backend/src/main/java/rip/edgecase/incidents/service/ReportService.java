package rip.edgecase.incidents.service;

import rip.edgecase.incidents.dto.IncidentReportResponse;

import java.time.LocalDate;

public interface ReportService {

    IncidentReportResponse generateIncidentSummary(LocalDate fromDate, LocalDate toDate);

}