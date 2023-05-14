package com.nifs.backend.model;


import com.nifs.backend.model.Facility;
import com.nifs.backend.model.VenueCharge;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="venue_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VenueMaster {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;
    @Id
    @Column(name = "venue_id", nullable = false, length = 10)
    private String venueId;
    @Column(name = "name", length = 255)
    private String venueName;
    @Column(name = "type", length = 50)
    private String type;
    @Column(name="Capacity")
    private int capacity;

    @Column(name="remark", length = 255)
    private String remark;

    @Column(name="location", length = 50)
    private String location;

    @Column(name="availability", length = 255)
    private String availability;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;



//    relationships
//    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
//    @JoinTable(name = "venue_charges",
//        joinColumns = {
//                @JoinColumn(name = "venue_id", referencedColumnName = "venue_id")
//        },
//        inverseJoinColumns = {
//                @JoinColumn(name="charge_id", referencedColumnName = "charge_id")
//        }
//    )
//    private Set<Charges> charges;

    @OneToMany(mappedBy = "venueMaster", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<VenueCharge> venueCharge;


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(name = "venue_facility",
        joinColumns = {
            @JoinColumn(name = "venue_id", referencedColumnName = "venue_id"),
        },
        inverseJoinColumns = {
            @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
        }
    )
//    @JsonManagedReference
    private Set<Facility> facilities;


}
