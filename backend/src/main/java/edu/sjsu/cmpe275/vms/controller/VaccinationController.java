package edu.sjsu.cmpe275.vms.controller;


import edu.sjsu.cmpe275.vms.model.Disease;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.security.CurrentUser;
import edu.sjsu.cmpe275.vms.service.DiseaseService;
import edu.sjsu.cmpe275.vms.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VaccinationController {

    @Autowired private VaccinationService vaccinationService;


    @PostMapping("/vaccination")
    @PreAuthorize("hasRole('ADMIN')")
    public Vaccination createVaccination(@CurrentUser @RequestParam String name,
                                         @RequestParam List<String> diseasesList,
                                         @RequestParam String manufacturer,
                                         @RequestParam int numberOfShots,
                                         @RequestParam int shotInternalVal,
                                         @RequestParam int duration
                                         ) {
        return this.vaccinationService.createVaccination(name,diseasesList,manufacturer,numberOfShots,shotInternalVal,duration);
    }
}
