package rip.edgecase.incidents.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class IncidentReportResponse {

    private String title;
    private LocalDateTime generatedAt;
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<IncidentReportRow> rows;

}