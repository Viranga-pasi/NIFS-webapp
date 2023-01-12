package com.nifs.backend.admin.OtherData.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.admin.EmployeeMaster.EmployeeMaster;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="province_master")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "province_id", nullable = false)
    private int provinceId;

    @Column(name="province_name", length = 30)
    private String provinceName;

   //Relationship
    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("province")
    private Set<District> districts;

    @OneToMany(mappedBy = "province", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("province")
    private List<EmployeeMaster> employee;

}
