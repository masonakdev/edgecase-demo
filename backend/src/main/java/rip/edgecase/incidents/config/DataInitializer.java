package rip.edgecase.incidents.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import rip.edgecase.incidents.entity.IncidentEntity;
import rip.edgecase.incidents.repository.IncidentRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(IncidentRepository incidentRepository) {
        return args -> {
            if (incidentRepository.count() == 0) {
                IncidentEntity incident = new IncidentEntity();
                incident.setStatus("APPROVED");
                incident.setLocation("Undisclosed");
                incident.setCategory("WALL");
                incident.setObjectType("CLIFF");
                incident.setJumpType("TRACK");
                incident.setInjuries("Ego, luck jar");
                incident.setSuit("Slick");
                incident.setCanopy("Unknown");
                incident.setContainer("Unknown");
                incident.setPilotChuteSize(-1);
                incident.setSliderConfig("Unknown");
                incident.setDeployMethod("STATIC_LINE");
                incident.setDelaySeconds(0);
                incident.setWeather("Clear, light wind");
                incident.setPossibleFactors("None listed");
                incident.setOccurredAt(LocalDate.now().minusDays(1));
                incident.setSummary("Synthetic test incident to verify DB + JPA wiring.");
                // reviewedBy and reviewedAt can stay null

                incidentRepository.save(incident);

                System.out.println("Inserted test incident with ID: " + incident.getId());
            }
        };
    }

}