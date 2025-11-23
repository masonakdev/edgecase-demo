package rip.edgecase.incidents.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateIncidentRequest {

    @NotBlank
    @Size(max = 128)
    private String location;

    @NotBlank
    @Size(max = 32)
    private String category;

    @NotBlank
    @Size(max = 8)
    private String objectType;

    @NotBlank
    @Size(max = 16)
    private String jumpType;

    @Size(max = 64)
    private String injuries;

    @Size(max = 32)
    private String suit;

    @Size(max = 32)
    private String canopy;

    @Size(max = 32)
    private String container;

    private Integer pilotChuteSize;

    @Size(max = 8)
    private String sliderConfig;

    @NotBlank
    @Size(max = 16)
    private String deployMethod;

    @NotNull
    @Min(0)
    @Max(60)
    private Integer delaySeconds;

    @NotBlank
    @Size(max = 128)
    private String weather;

    @Size(max = 128)
    private String possibleFactors;

    @NotNull
    @PastOrPresent
    private LocalDate occurredAt;

    @NotBlank
    private String summary;

}