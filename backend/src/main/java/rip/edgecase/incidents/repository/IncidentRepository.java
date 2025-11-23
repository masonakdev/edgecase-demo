package rip.edgecase.incidents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rip.edgecase.incidents.entity.IncidentEntity;

import java.time.LocalDate;
import java.util.List;

public interface IncidentRepository extends JpaRepository<IncidentEntity, Long> {

    @Query("""
        SELECT i FROM IncidentEntity i
        WHERE (:status IS NULL OR i.status = :status)
          AND (:category IS NULL OR i.category = :category)
          AND (:objectType IS NULL OR i.objectType = :objectType)
          AND (:jumpType IS NULL OR i.jumpType = :jumpType)
          AND (:fromDate IS NULL OR i.occurredAt >= :fromDate)
          AND (:toDate IS NULL OR i.occurredAt <= :toDate)
        ORDER BY i.occurredAt DESC
        """)
    List<IncidentEntity> searchPublic(
            @Param("status") String status,
            @Param("category") String category,
            @Param("objectType") String objectType,
            @Param("jumpType") String jumpType,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

    @Query("""
    SELECT i.category AS category,
           i.objectType AS objectType,
           i.jumpType AS jumpType,
           COUNT(i) AS total,
           MIN(i.occurredAt) AS firstOccurredAt,
           MAX(i.occurredAt) AS lastOccurredAt
    FROM IncidentEntity i
    WHERE i.status = 'APPROVED'
      AND i.occurredAt BETWEEN :fromDate AND :toDate
    GROUP BY i.category, i.objectType, i.jumpType
    ORDER BY total DESC
    """)
    List<IncidentReportRowProjection> summarizeApprovedIncidents(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

}