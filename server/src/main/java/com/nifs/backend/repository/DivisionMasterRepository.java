package com.nifs.backend.repository;

import com.nifs.backend.model.DivisionMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface DivisionMasterRepository extends JpaRepository<DivisionMaster, String> {
    @Query("select d from DivisionMaster d where d.locationId.locationId = ?1 order by d.divisionId, d.name")
    List<DivisionMaster> findDivisionByLocationId(String locationId);

    @Transactional
    @Modifying
    @Query("update DivisionMaster d set d.name = :name, d.updatedDate = :updatedDate where d.divisionId like :divisionId")
    void updateDivisionMaster(@Param("name") String name, @Param("updatedDate") Date updatedDate,
                              @Param("divisionId") String divisionId);


//    @Query(value = "SELECT TOP 1 division_id FROM division_master ORDER BY division_id DESC", nativeQuery = true)
    @Query(value = "SELECT division_id FROM division_master ORDER BY division_id DESC LIMIT 1", nativeQuery = true)
    String returnLastId();

    @Query(value = "SELECT * FROM division_master WHERE division_id =?1",nativeQuery = true)
    DivisionMaster returnDivision(String id);




}
