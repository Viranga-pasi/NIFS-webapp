package com.nifs.backend.admin.Locations;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface LocationRepository extends JpaRepository<Locations, String> {
    @Transactional
    @Modifying
    @Query("delete from Locations l where l.locationId = :locationId")
    void deleteLocation(String locationId);
    @Transactional
    @Modifying
    @Query("""
            update Locations l set l.locationName = :locationName, l.address = :address, l.telNo = :telNo, l.faxNo = :faxNo, l.dateUpdated = :dateUpdated
            where l.locationId = :locationId""")
    void updateLocation(@Param("locationName") String locationName, @Param("address") String address,
                        @Param("telNo") String telNo, @Param("faxNo") String faxNo,
                        @Param("dateUpdated") Date dateUpdated, @Param("locationId") String locationId);


    @Query(value = "SELECT * FROM locations_master WHERE location_id =?1", nativeQuery = true)
    Locations getLocation(String id);

    @Query(value = "SELECT TOP 1 location_id FROM venue_locations_master ORDER BY location_id DESC", nativeQuery = true)
    String returnLastId();
}
