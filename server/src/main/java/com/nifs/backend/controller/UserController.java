package com.nifs.backend.controller;

import com.nifs.backend.constant.RequestStatus;

import com.nifs.backend.dto.ChangePasswordDTO;
import com.nifs.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    @Autowired
    private IUserService userService;




    @GetMapping("/test")
    private String test(){
        return "Hello!";
    }

    @PatchMapping("/change-password/{id}")
    private ResponseEntity<?> changePassword(@PathVariable int id, @RequestBody ChangePasswordDTO data){
        log.info("+-------+ Change Password +--------+");
       Map<String, Object> map = new LinkedHashMap<String, Object>();
       try {
           if (userService.changePassword(id, data)) {
               //return success response code
               map.put("status", RequestStatus.SUCCESS);
               map.put("code", 201);
               map.put("message", "Password is Successfully Updated!");
               return new ResponseEntity<>(map, HttpStatus.OK);
           }
           //return error response code
           map.put("status", RequestStatus.ERROR);
           map.put("code", 404);
           map.put("message", "Could not change the Password. Please Try Again!");
           return new ResponseEntity<>(map, HttpStatus.OK);

       } catch (Exception e) {
           //return exception response code
           System.out.println(e.toString());
           map.put("status", RequestStatus.ERROR);
           map.put("code", 400);
           map.put("error", e.toString());
           map.put("message", "Internal Server Error. Please Try Again!");
           return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
       }
   }
}
