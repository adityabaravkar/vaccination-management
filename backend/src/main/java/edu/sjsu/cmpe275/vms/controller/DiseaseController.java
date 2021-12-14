package edu.sjsu.cmpe275.vms.controller;

import edu.sjsu.cmpe275.vms.model.Disease;
import edu.sjsu.cmpe275.vms.payload.AddDiseaseRequest;
import edu.sjsu.cmpe275.vms.security.CurrentUser;

import edu.sjsu.cmpe275.vms.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;


    @PostMapping("/addDisease")
    @PreAuthorize("hasRole('ADMIN')")
    public Disease addDisease(@CurrentUser @RequestBody AddDiseaseRequest request) {
        return this.diseaseService.addDisease(request.getDiseaseName(), request.getDescription());
    }
}
