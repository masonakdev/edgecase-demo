package rip.edgecase.incidents.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "incident")
public class IncidentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 16)
    private String status;

    @Column(nullable = false, length = 128)
    private String location;

    @Column(nullable = false, length = 32)
    private String category;

    @Column(name = "object_type", nullable = false, length = 8)
    private String objectType;

    @Column(name = "jump_type", nullable = false, length = 16)
    private String jumpType;

    @Column(nullable = false, length = 64)
    private String injuries;

    @Column(nullable = false, length = 32)
    private String suit;

    @Column(nullable = false, length = 32)
    private String canopy;

    @Column(nullable = false, length = 32)
    private String container;

    @Column(name = "pilot_chute_size", nullable = false)
    private Integer pilotChuteSize;

    @Column(name = "slider_config", nullable = false, length = 8)
    private String sliderConfig;

    @Column(name = "deploy_method", nullable = false, length = 16)
    private String deployMethod;

    @Column(name = "delay_seconds", nullable = false)
    private Integer delaySeconds;

    @Column(nullable = false, length = 128)
    private String weather;

    @Column(name = "possible_factors", nullable = false, length = 128)
    private String possibleFactors;

    @Column(name = "occurred_at", nullable = false)
    private LocalDate occurredAt;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "reviewed_by", length = 32)
    private String reviewedBy;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

}