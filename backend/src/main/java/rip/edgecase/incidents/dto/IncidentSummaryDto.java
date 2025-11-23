package rip.edgecase.incidents.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class IncidentSummaryDto {

    private Long id;
    private String status;
    private String category;
    private String objectType;
    private String jumpType;
    private String location;
    private String injuries;
    private String weather;
    private LocalDate occurredAt;
    private LocalDateTime createdAt;

}