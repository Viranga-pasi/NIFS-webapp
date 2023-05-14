package com.nifs.backend.repository;

import com.nifs.backend.model.VenueCharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VenueChargeRepository extends JpaRepository<VenueCharge, Integer> {
    @Query("select v from VenueCharge v where v.id = :id order by v.venueMaster.venueId, v.chargeId.chargeId")
    Optional<VenueCharge> returnVenueCharges(@Param("id") int id);

    @Query("select v from VenueCharge v where v.id = :id")
    Optional<VenueCharge> returnCharge(@Param("id") int id);

    @Query(value = "SELECT * FROM venue_charges WHERE id?=1", nativeQuery = true)
    VenueCharge returnVenueChargeById(int id);
}