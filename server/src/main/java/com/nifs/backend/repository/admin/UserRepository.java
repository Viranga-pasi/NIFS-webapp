package com.nifs.backend.repository.admin;

import com.nifs.backend.constant.UserRole;
import com.nifs.backend.model.admin.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.email = ?2")
    int updatePasswordByEmailEquals(String password, String email);
    @Query("select e.employee.gsuitEmail from User e where e.employee.id = ?1")
    String findEmailById(String id);
    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.id = ?2")
    void updatePasswordByIdEquals(String password, String id);
    User findByEmployee_GsuitEmailEquals(String gsuitEmail);
    @Transactional
    @Modifying
    @Query("update User u set u.lastLogin = ?1 where u.employee.epfNo = ?2")
    void updateLoginDate(Date lastLogin, int employee);
    @Transactional
    @Modifying
    @Query("update User u set u.isDelete = ?1 where u.employee.epfNo = ?2")
    void updateIsDelete(Boolean isDelete, int employee);
    @Transactional
    @Modifying
    @Query("update User u set u.role = ?1 where u.employee.epfNo = ?2")
    void updateUserRole(UserRole role, int employee);
    //change password
    @Transactional
    @Modifying
    @Query("update User e set e.password = ?1, e.lastLogin = ?2 where e.employee.epfNo = ?3")
    void changePassword(String password, Date d, int epfNo);


    //check by epfNo and password
    @Query("select e from User e where e.employee.epfNo = ?1 and e.password = ?2")
    User checkIdAndPassword(int id, String password);

    //return login details by epfNo
    @Query("select e from User e where e.employee.epfNo = ?1")
    User returnLoginDetails(int epfNo);





}
