package rip.edgecase.incidents.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class IncidentReportRow {

    private String category;
    private String objectType;
    private String jumpType;
    private Long totalIncidents;
    private LocalDate firstOccurredAt;
    private LocalDate lastOccurredAt;

}