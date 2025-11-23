package rip.edgecase.incidents.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rip.edgecase.incidents.dto.CreateIncidentRequest;
import rip.edgecase.incidents.dto.IncidentDto;
import rip.edgecase.incidents.dto.IncidentSummaryDto;
import rip.edgecase.incidents.dto.ModeratorUpdateIncidentRequest;
import rip.edgecase.incidents.entity.IncidentEntity;
import rip.edgecase.incidents.repository.IncidentRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentServiceImpl(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    @Override
    @Transactional
    public IncidentDto submitIncident(CreateIncidentRequest request) {
        LocalDateTime now = LocalDateTime.now();

        IncidentEntity entity = new IncidentEntity();
        entity.setStatus("SUBMITTED");
        entity.setLocation(defaultIfBlank(request.getLocation(), "Undisclosed"));
        entity.setCategory(request.getCategory());
        entity.setObjectType(request.getObjectType());
        entity.setJumpType(request.getJumpType());
        entity.setInjuries(defaultIfBlank(request.getInjuries(), "Ego, luck jar"));
        entity.setSuit(defaultIfBlank(request.getSuit(), "Slick"));
        entity.setCanopy(defaultIfBlank(request.getCanopy(), "Unknown"));
        entity.setContainer(defaultIfBlank(request.getContainer(), "Unknown"));
        entity.setPilotChuteSize(
                request.getPilotChuteSize() != null ? request.getPilotChuteSize() : -1
        );
        entity.setSliderConfig(defaultIfBlank(request.getSliderConfig(), "Unknown"));
        entity.setDeployMethod(request.getDeployMethod());
        entity.setDelaySeconds(request.getDelaySeconds());
        entity.setWeather(request.getWeather());
        entity.setPossibleFactors(
                defaultIfBlank(request.getPossibleFactors(), "None listed")
        );
        entity.setOccurredAt(request.getOccurredAt());
        entity.setCreatedAt(now);
        entity.setSummary(request.getSummary());

        IncidentEntity saved = incidentRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidentSummaryDto> searchPublicIncidents(
            String category,
            String objectType,
            String jumpType,
            LocalDate fromDate,
            LocalDate toDate
    ) {
        return incidentRepository.searchPublic(
                        "APPROVED",
                        category,
                        objectType,
                        jumpType,
                        fromDate,
                        toDate
                ).stream()
                .map(this::toSummaryDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidentSummaryDto> getModerationQueue() {
        return incidentRepository.searchPublic(
                        "SUBMITTED",
                        null,
                        null,
                        null,
                        null,
                        null
                ).stream()
                .map(this::toSummaryDto)
                .toList();
    }

    @Override
    @Transactional
    public IncidentDto approveIncident(Long id, String reviewer) {
        IncidentEntity entity = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));
        entity.setStatus("APPROVED");
        entity.setReviewedBy(reviewer);
        entity.setReviewedAt(LocalDateTime.now());
        IncidentEntity saved = incidentRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional
    public IncidentDto retractIncident(Long id, String reviewer) {
        IncidentEntity entity = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));
        entity.setStatus("RETRACTED");
        entity.setReviewedBy(reviewer);
        entity.setReviewedAt(LocalDateTime.now());
        IncidentEntity saved = incidentRepository.save(entity);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public IncidentDto getIncident(Long id) {
        IncidentEntity entity = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));
        return toDto(entity);
    }

    @Override
    @Transactional
    public IncidentDto updateIncidentForModeration(Long id, ModeratorUpdateIncidentRequest request) {
        IncidentEntity entity = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found: " + id));

        entity.setLocation(defaultIfBlank(request.getLocation(), "Undisclosed"));
        entity.setCategory(request.getCategory());
        entity.setObjectType(request.getObjectType());
        entity.setJumpType(request.getJumpType());
        entity.setInjuries(defaultIfBlank(request.getInjuries(), "Ego, luck jar"));
        entity.setWeather(request.getWeather());
        entity.setPossibleFactors(defaultIfBlank(request.getPossibleFactors(), "None listed"));
        entity.setSummary(request.getSummary());

        IncidentEntity saved = incidentRepository.save(entity);
        return toDto(saved);
    }

    private String defaultIfBlank(String value, String defaultValue) {
        return (value == null || value.isBlank()) ? defaultValue : value;
    }

    private IncidentDto toDto(IncidentEntity entity) {
        IncidentDto dto = new IncidentDto();
        dto.setId(entity.getId());
        dto.setStatus(entity.getStatus());
        dto.setLocation(entity.getLocation());
        dto.setCategory(entity.getCategory());
        dto.setObjectType(entity.getObjectType());
        dto.setJumpType(entity.getJumpType());
        dto.setInjuries(entity.getInjuries());
        dto.setSuit(entity.getSuit());
        dto.setCanopy(entity.getCanopy());
        dto.setContainer(entity.getContainer());
        dto.setPilotChuteSize(entity.getPilotChuteSize());
        dto.setSliderConfig(entity.getSliderConfig());
        dto.setDeployMethod(entity.getDeployMethod());
        dto.setDelaySeconds(entity.getDelaySeconds());
        dto.setWeather(entity.getWeather());
        dto.setPossibleFactors(entity.getPossibleFactors());
        dto.setOccurredAt(entity.getOccurredAt());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setReviewedBy(entity.getReviewedBy());
        dto.setReviewedAt(entity.getReviewedAt());
        dto.setSummary(entity.getSummary());
        return dto;
    }

    private IncidentSummaryDto toSummaryDto(IncidentEntity entity) {
        IncidentSummaryDto dto = new IncidentSummaryDto();
        dto.setId(entity.getId());
        dto.setStatus(entity.getStatus());
        dto.setCategory(entity.getCategory());
        dto.setObjectType(entity.getObjectType());
        dto.setJumpType(entity.getJumpType());
        dto.setLocation(entity.getLocation());
        dto.setInjuries(entity.getInjuries());
        dto.setWeather(entity.getWeather());
        dto.setOccurredAt(entity.getOccurredAt());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

}