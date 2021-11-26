package edu.sjsu.cmpe275.vms.controller;


import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Disease;
import edu.sjsu.cmpe275.vms.security.CurrentUser;

import edu.sjsu.cmpe275.vms.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;


    @PostMapping("/disease")
    @PreAuthorize("hasRole('ADMIN')")
    public Disease createDisease(@CurrentUser @RequestParam String name,
                                 @RequestParam String description) {
        return this.diseaseService.createDisease(name,description);
    }
}
