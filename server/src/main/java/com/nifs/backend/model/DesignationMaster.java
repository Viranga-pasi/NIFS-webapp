package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "designation_master")
public class DesignationMaster {

    @Id
    @Column(name = "designation_id", nullable = false, length = 10)
    private String designationId;

    @Column(name = "designation_name", length = 255)
    private String designationName;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateUpdated;


    //relationships

    //locations
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Locations locationId;

    //employee
    @JsonIgnore
    @OneToMany(mappedBy = "designationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EmployeeMaster> employee;

    public DesignationMaster(String designationId, String designationName, Date dateCreated, Locations locationId) {
        this.designationId = designationId;
        this.designationName = designationName;
        this.dateCreated = dateCreated;
        this.locationId = locationId;
    }
}
