package rip.edgecase.incidents.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class IncidentDto {

    private Long id;
    private String status;
    private String location;
    private String category;
    private String objectType;
    private String jumpType;
    private String injuries;
    private String suit;
    private String canopy;
    private String container;
    private Integer pilotChuteSize;
    private String sliderConfig;
    private String deployMethod;
    private Integer delaySeconds;
    private String weather;
    private String possibleFactors;
    private LocalDate occurredAt;
    private LocalDateTime createdAt;
    private String reviewedBy;
    private LocalDateTime reviewedAt;
    private String summary;

}