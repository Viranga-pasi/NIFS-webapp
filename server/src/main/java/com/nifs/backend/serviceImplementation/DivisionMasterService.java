package com.nifs.backend.serviceImplementation;

import com.nifs.backend.common.Common;
import com.nifs.backend.model.EmployeeMaster;
import com.nifs.backend.repository.EmployeeMasterRepository;
import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import com.nifs.backend.dto.DivisionMasterDTO;
import com.nifs.backend.model.DivisionMaster;
import com.nifs.backend.repository.DivisionMasterRepository;
import com.nifs.backend.service.IDivisionMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DivisionMasterService implements IDivisionMasterService {

    @Autowired
    private DivisionMasterRepository divMasterRepo;

    @Autowired
    private LocationRepository locRepo;

    @Autowired
    private EmployeeMasterRepository empRepo;
    private final Common common = new Common();

    //    get all divisions
    @Override
    public List<DivisionMasterDTO> getAll() {
        try {
            List<DivisionMaster> divData = divMasterRepo.findAll();
            List<DivisionMasterDTO> divDTO = new ArrayList<>();
            for (DivisionMaster d : divData) {
                DivisionMasterDTO dto = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationName());
                divDTO.add(dto);
            }
            return divDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }

    }


    //create new divisions
    @Override
    public Boolean createDivision(DivisionMasterDTO d) {

        if (divMasterRepo.returnDivision(d.getDivisionId()) == null) {

            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocationId());
            DivisionMaster dm = new DivisionMaster(d.getDivisionId(), d.getName(), date, l);
            divMasterRepo.save(dm);
            return true;
        }
        else {
            return false;
        }


    }

    //delete division
    @Override
    public Boolean deleteDivision(String divisionId) {
        try {
            DivisionMaster divisionMaster = divMasterRepo.returnDivision(divisionId);

            List<EmployeeMaster> empMaster = empRepo.findByDivisionId(divisionId);
            for (EmployeeMaster e : empMaster) {
                System.out.println("division " + e.getDivisionId().getDivisionId());
            }
            if (divisionMaster != null) {
                divMasterRepo.deleteById(divisionMaster.getDivisionId());
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    // return new id
    @Override
    public String returnNewDivisionId() {
        try {
            String lastId = divMasterRepo.returnLastId();
            if (lastId == null) {
                return "DI1001";
            }
            else {
                return common.generateNewId(lastId);

            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }


    //    update division master
    @Override
    public Boolean updateDivisionMaster(DivisionMasterDTO dmData, String dvId) {
        try {
            if (divMasterRepo.returnDivision(dvId) != null) {
                Date d = new Date();
                divMasterRepo.updateDivisionMaster(dmData.getName(), d, dvId);
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    // get divisions by location id
    @Override
    public List<DivisionMasterDTO> GetDivisionByLocationId(String locID) {
        try {
            if (locRepo.getLocation(locID) != null) {
                List<DivisionMaster> dm = divMasterRepo.findDivisionByLocationId(locID);
                List<DivisionMasterDTO> dDTO = new ArrayList<DivisionMasterDTO>();
                for (DivisionMaster d : dm) {
                    DivisionMasterDTO dDTOSingle = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId());
                    dDTO.add(dDTOSingle);
                }
                return dDTO;
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //get division by id
    @Override
    public DivisionMasterDTO getDivisionById(String id) {

        DivisionMaster d = divMasterRepo.returnDivision(id);
        if (d != null) {
            return new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId());
        }
        return null;

    }

    @Override
    public DivisionMaster returnDivision(String id) {
        return divMasterRepo.returnDivision(id);
    }
}
