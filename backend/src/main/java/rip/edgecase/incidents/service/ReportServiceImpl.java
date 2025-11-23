package rip.edgecase.incidents.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rip.edgecase.incidents.dto.IncidentReportResponse;
import rip.edgecase.incidents.dto.IncidentReportRow;
import rip.edgecase.incidents.repository.IncidentReportRowProjection;
import rip.edgecase.incidents.repository.IncidentRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final IncidentRepository incidentRepository;

    public ReportServiceImpl(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public IncidentReportResponse generateIncidentSummary(LocalDate fromDate, LocalDate toDate) {
        LocalDate today = LocalDate.now();
        LocalDate effectiveTo = toDate != null ? toDate : today;
        LocalDate effectiveFrom = fromDate != null ? fromDate : effectiveTo.minusMonths(6);

        List<IncidentReportRowProjection> projections =
                incidentRepository.summarizeApprovedIncidents(effectiveFrom, effectiveTo);

        List<IncidentReportRow> rows = projections.stream().map(p -> {
            IncidentReportRow row = new IncidentReportRow();
            row.setCategory(p.getCategory());
            row.setObjectType(p.getObjectType());
            row.setJumpType(p.getJumpType());
            row.setTotalIncidents(p.getTotal());
            row.setFirstOccurredAt(p.getFirstOccurredAt());
            row.setLastOccurredAt(p.getLastOccurredAt());
            return row;
        }).toList();

        IncidentReportResponse response = new IncidentReportResponse();
        response.setTitle("Approved Incident Summary Report");
        response.setGeneratedAt(LocalDateTime.now());
        response.setFromDate(effectiveFrom);
        response.setToDate(effectiveTo);
        response.setRows(rows);

        return response;
    }

}