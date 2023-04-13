package com.nifs.backend.controller;

import com.nifs.backend.model.admin.Religions;
import com.nifs.backend.service.admin.IOtherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

//    @Autowired
//    SimpleMessaging

    @GetMapping("/{id}")
    private ResponseEntity<?> returnResponse(@PathVariable int id) {
        return ResponseEntity.ok("success");

    }
}
