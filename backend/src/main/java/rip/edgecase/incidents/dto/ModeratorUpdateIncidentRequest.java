package rip.edgecase.incidents.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModeratorUpdateIncidentRequest {

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

    @NotBlank
    @Size(max = 128)
    private String weather;

    @Size(max = 128)
    private String possibleFactors;

    @NotBlank
    private String summary;

}