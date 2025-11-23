package rip.edgecase.incidents.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import rip.edgecase.incidents.dto.IncidentReportResponse;
import rip.edgecase.incidents.dto.IncidentReportRow;
import rip.edgecase.incidents.repository.IncidentReportRowProjection;
import rip.edgecase.incidents.repository.IncidentRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReportServiceImplTest {

    @Mock
    private IncidentRepository incidentRepository;

    @InjectMocks
    private ReportServiceImpl reportService;

    @Test
    void generateIncidentSummary_usesDefaultsAndMapsRows() {
        IncidentReportRowProjection projection = new IncidentReportRowProjection() {
            @Override
            public String getCategory() {
                return "Near-fatality";
            }

            @Override
            public String getObjectType() {
                return "SPAN";
            }

            @Override
            public String getJumpType() {
                return "Sub-terminal";
            }

            @Override
            public Long getTotal() {
                return 3L;
            }

            @Override
            public LocalDate getFirstOccurredAt() {
                return LocalDate.of(2025, 4, 19);
            }

            @Override
            public LocalDate getLastOccurredAt() {
                return LocalDate.of(2025, 9, 1);
            }
        };

        when(incidentRepository.summarizeApprovedIncidents(any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(List.of(projection));

        IncidentReportResponse response = reportService.generateIncidentSummary(null, null);

        assertThat(response.getTitle()).isEqualTo("Approved Incident Summary Report");
        assertThat(response.getGeneratedAt()).isNotNull();
        assertThat(response.getFromDate()).isNotNull();
        assertThat(response.getToDate()).isNotNull();

        List<IncidentReportRow> rows = response.getRows();
        assertThat(rows).hasSize(1);

        IncidentReportRow row = rows.get(0);
        assertThat(row.getCategory()).isEqualTo("Near-fatality");
        assertThat(row.getObjectType()).isEqualTo("SPAN");
        assertThat(row.getJumpType()).isEqualTo("Sub-terminal");
        assertThat(row.getTotalIncidents()).isEqualTo(3L);
        assertThat(row.getFirstOccurredAt()).isEqualTo(LocalDate.of(2025, 4, 19));
        assertThat(row.getLastOccurredAt()).isEqualTo(LocalDate.of(2025, 9, 1));
    }

    @Test
    void generateIncidentSummary_respectsExplicitDateRange() {
        LocalDate from = LocalDate.of(2025, 1, 1);
        LocalDate to = LocalDate.of(2025, 12, 31);

        when(incidentRepository.summarizeApprovedIncidents(from, to))
                .thenReturn(List.of());

        IncidentReportResponse response = reportService.generateIncidentSummary(from, to);

        assertThat(response.getFromDate()).isEqualTo(from);
        assertThat(response.getToDate()).isEqualTo(to);
        assertThat(response.getRows()).isEmpty();
    }

}