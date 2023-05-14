package com.nifs.backend.service;

import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.ChangePasswordDTO;
import com.nifs.backend.dto.EmployeeMasterDTO;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public interface IUserService {

    //create new login
    boolean createLogin(EmployeeMasterDTO employee) throws NoSuchAlgorithmException;

    //change the user role
    boolean changeRole(int id, UserRole role);

    //change password
    boolean changePassword(int id, ChangePasswordDTO data);

    void updateIsDelete(boolean b, int id);
}
