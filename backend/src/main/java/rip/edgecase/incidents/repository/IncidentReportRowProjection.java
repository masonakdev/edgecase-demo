package rip.edgecase.incidents.repository;

import java.time.LocalDate;

public interface IncidentReportRowProjection {

    String getCategory();

    String getObjectType();

    String getJumpType();

    Long getTotal();

    LocalDate getFirstOccurredAt();

    LocalDate getLastOccurredAt();

}