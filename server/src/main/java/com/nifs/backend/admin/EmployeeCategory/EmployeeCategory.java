package com.nifs.backend.admin.EmployeeCategory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.admin.EmployeeMaster.EmployeeMaster;
import com.nifs.backend.admin.Locations.Locations;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_category_master")
public class EmployeeCategory {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;

    @Id
    @Column(name = "employee_category_code", nullable = false, length = 10)
    private String employeeCategoryId;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "ot_rate")
    private float otRate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;

    //relationship

    //location
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("empCategory")
    private Locations location;

    //employee
    @OneToMany(mappedBy = "empCategory", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("empCategory")
    private List<EmployeeMaster> employee;

    //constructor for create instance

    public EmployeeCategory(String employeeCategoryId, String description, float otRate, Date dateCreated, Locations location) {
        this.employeeCategoryId = employeeCategoryId;
        this.description = description;
        this.otRate = otRate;
        this.dateCreated = dateCreated;
        this.location = location;
    }
}
