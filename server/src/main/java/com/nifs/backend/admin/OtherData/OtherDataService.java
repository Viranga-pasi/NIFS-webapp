package com.nifs.backend.admin.OtherData;

import com.nifs.backend.admin.Division.DivisionMaster;
import com.nifs.backend.admin.Division.DivisionMasterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OtherDataService {

    @Autowired
    private DistrictRepository districtRepo;

    @Autowired
    private ProvinceRepository provinceRepo;

//    return all districts
    public List<DistrictDTO> returnAllDistricts() {
        List<District> districts =  districtRepo.findAll();
        List<DistrictDTO> districtDTO = new ArrayList<>();
        for(District d : districts){
            DistrictDTO dto = new DistrictDTO(d.getDistrictId(), d.getDistrictName());
            districtDTO.add(dto);
        }
        return districtDTO;
    }

    public List<ProvinceDTO> returnAllProvinces() {

        List<Province> provinces =  provinceRepo.findAll();
        List<ProvinceDTO> provinceDTO = new ArrayList<>();
        for(Province p : provinces){
            ProvinceDTO dto = new ProvinceDTO(p.getProvinceId(), p.getProvinceName());
            provinceDTO.add(dto);
        }
        return provinceDTO;
    }

//    add new province
    public Boolean addProvince(Province pData) {

        if(provinceRepo.returnProvince(pData.getProvinceName()) == null){
            provinceRepo.save(pData);
            return true;
        }
        else{
            return false;
        }

    }


    //    add new district
    public Boolean addDistrict(District dData, int provinceId) {
        Province province = provinceRepo.findProvinceById(provinceId);
        if(districtRepo.returnDistrict(dData.getDistrictName()) == null){
            dData.setProvince(province);
            districtRepo.save(dData);
            return true;
        }
        else{
            return false;
        }
    }

//    edit district
    public Boolean editDistrict(int dId, District dData) {

        if(districtRepo.returnDistrictById(dId) != null){
            districtRepo.updateDistrictNameByDistrictIdEquals(dData.getDistrictName(), dId);
            return true;
        }
        else {
            return null;
        }
    }
//return Districts By Province Id
    public List<DistrictDTO> returnDistrictsByProvinceId(int id) {
        Optional<Province> p = provinceRepo.findById(id);
        if(p.isPresent()){
            List<District> districts =  districtRepo.findDistrictByProvinceId(id);
            List<DistrictDTO> districtDTO = new ArrayList<>();
            for(District d : districts){
                DistrictDTO dto = new DistrictDTO(d.getDistrictId(), d.getDistrictName());
                districtDTO.add(dto);
            }
            return districtDTO;
        }
        return null;
    }
}
