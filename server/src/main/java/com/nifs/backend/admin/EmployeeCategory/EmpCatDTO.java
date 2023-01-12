package com.nifs.backend.admin.EmployeeCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmpCatDTO {
    private String employeeCategoryId;
    private String description;
    private String otRate;
    private String location;


}
