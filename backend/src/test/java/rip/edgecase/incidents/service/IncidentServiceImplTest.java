package rip.edgecase.incidents.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import rip.edgecase.incidents.dto.CreateIncidentRequest;
import rip.edgecase.incidents.dto.IncidentDto;
import rip.edgecase.incidents.entity.IncidentEntity;
import rip.edgecase.incidents.repository.IncidentRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IncidentServiceImplTest {

    @Mock
    private IncidentRepository incidentRepository;

    @InjectMocks
    private IncidentServiceImpl incidentService;

    private CreateIncidentRequest validRequest;

    @BeforeEach
    void setUp() {
        validRequest = new CreateIncidentRequest();
        validRequest.setLocation("US");
        validRequest.setCategory("Near-fatality");
        validRequest.setObjectType("SPAN");
        validRequest.setJumpType("Sub-terminal");
        validRequest.setInjuries(null);
        validRequest.setSuit(null);
        validRequest.setCanopy(null);
        validRequest.setContainer(null);
        validRequest.setPilotChuteSize(null);
        validRequest.setSliderConfig(null);
        validRequest.setDeployMethod("DELAY");
        validRequest.setDelaySeconds(3);
        validRequest.setWeather("Sunny");
        validRequest.setPossibleFactors(null);
        validRequest.setOccurredAt(LocalDate.of(2025, 4, 19));
        validRequest.setSummary("Example incident summary for testing.");
    }

    @Test
    void submitIncident_setsDefaultsAndStatusSubmitted() {
        IncidentEntity savedEntity = new IncidentEntity();
        savedEntity.setId(10L);
        savedEntity.setStatus("SUBMITTED");
        savedEntity.setLocation("US");
        savedEntity.setCategory("Near-fatality");
        savedEntity.setObjectType("SPAN");
        savedEntity.setJumpType("Sub-terminal");
        savedEntity.setInjuries("Ego, luck jar");
        savedEntity.setSuit("Slick");
        savedEntity.setCanopy("Unknown");
        savedEntity.setContainer("Unknown");
        savedEntity.setPilotChuteSize(-1);
        savedEntity.setSliderConfig("Unknown");
        savedEntity.setDeployMethod("DELAY");
        savedEntity.setDelaySeconds(3);
        savedEntity.setWeather("Sunny");
        savedEntity.setPossibleFactors("None listed");
        savedEntity.setOccurredAt(LocalDate.of(2025, 4, 19));
        savedEntity.setCreatedAt(LocalDateTime.now());
        savedEntity.setSummary("Example incident summary for testing.");

        when(incidentRepository.save(any(IncidentEntity.class))).thenReturn(savedEntity);

        IncidentDto result = incidentService.submitIncident(validRequest);

        ArgumentCaptor<IncidentEntity> captor = ArgumentCaptor.forClass(IncidentEntity.class);
        verify(incidentRepository, times(1)).save(captor.capture());

        IncidentEntity toSave = captor.getValue();
        assertThat(toSave.getStatus()).isEqualTo("SUBMITTED");
        assertThat(toSave.getInjuries()).isEqualTo("Ego, luck jar");
        assertThat(toSave.getSuit()).isEqualTo("Slick");
        assertThat(toSave.getCanopy()).isEqualTo("Unknown");
        assertThat(toSave.getContainer()).isEqualTo("Unknown");
        assertThat(toSave.getPilotChuteSize()).isEqualTo(-1);
        assertThat(toSave.getSliderConfig()).isEqualTo("Unknown");
        assertThat(toSave.getPossibleFactors()).isEqualTo("None listed");

        assertThat(result.getId()).isEqualTo(10L);
        assertThat(result.getStatus()).isEqualTo("SUBMITTED");
        assertThat(result.getCategory()).isEqualTo("Near-fatality");
    }

    @Test
    void approveIncident_setsStatusApprovedAndReviewer() {
        IncidentEntity existing = new IncidentEntity();
        existing.setId(5L);
        existing.setStatus("SUBMITTED");
        existing.setOccurredAt(LocalDate.of(2025, 4, 19));

        when(incidentRepository.findById(5L)).thenReturn(Optional.of(existing));
        when(incidentRepository.save(any(IncidentEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        IncidentDto result = incidentService.approveIncident(5L, "moderatorUser");

        ArgumentCaptor<IncidentEntity> captor = ArgumentCaptor.forClass(IncidentEntity.class);
        verify(incidentRepository).save(captor.capture());
        IncidentEntity saved = captor.getValue();

        assertThat(saved.getStatus()).isEqualTo("APPROVED");
        assertThat(saved.getReviewedBy()).isEqualTo("moderatorUser");
        assertThat(saved.getReviewedAt()).isNotNull();

        assertThat(result.getStatus()).isEqualTo("APPROVED");
        assertThat(result.getReviewedBy()).isEqualTo("moderatorUser");
        assertThat(result.getReviewedAt()).isNotNull();
    }

    @Test
    void retractIncident_setsStatusRetractedAndReviewer() {
        IncidentEntity existing = new IncidentEntity();
        existing.setId(6L);
        existing.setStatus("APPROVED");
        existing.setOccurredAt(LocalDate.of(2025, 5, 1));

        when(incidentRepository.findById(6L)).thenReturn(Optional.of(existing));
        when(incidentRepository.save(any(IncidentEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        IncidentDto result = incidentService.retractIncident(6L, "moderatorUser");

        ArgumentCaptor<IncidentEntity> captor = ArgumentCaptor.forClass(IncidentEntity.class);
        verify(incidentRepository).save(captor.capture());
        IncidentEntity saved = captor.getValue();

        assertThat(saved.getStatus()).isEqualTo("RETRACTED");
        assertThat(saved.getReviewedBy()).isEqualTo("moderatorUser");
        assertThat(saved.getReviewedAt()).isNotNull();

        assertThat(result.getStatus()).isEqualTo("RETRACTED");
    }

    @Test
    void approveIncident_throwsWhenNotFound() {
        when(incidentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () ->
                incidentService.approveIncident(999L, "moderatorUser")
        );
    }

}