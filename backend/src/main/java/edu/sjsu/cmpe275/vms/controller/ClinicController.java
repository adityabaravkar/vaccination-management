package edu.sjsu.cmpe275.vms.controller;


import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.security.CurrentUser;
import edu.sjsu.cmpe275.vms.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClinicController {

    @Autowired private ClinicService clinicService;


    @GetMapping(path = "/clinic/{id}")
    public List<Vaccination> getVaccinations(@PathVariable(value = "id") long id) {
        return this.clinicService.getVaccinations(id);
    }

    @PostMapping(path = "/clinic/addVaccine")
    @PreAuthorize("hasRole('ADMIN')")
    public Clinic addVaccination(@RequestParam long clinic_id,
                                 @RequestParam List<Long> vaccination_ids) {
        return this.clinicService.addVaccinations(clinic_id, vaccination_ids);
    }

    @PostMapping("/clinic")
    @PreAuthorize("hasRole('ADMIN')")
    public Clinic createClinic(@CurrentUser @RequestParam String name,
                               @RequestBody Address address,
                               @RequestParam String businessHours,
                               @RequestParam int numberOfPhysicians
                               ) {
        return this.clinicService.createClinic(name, address, businessHours, numberOfPhysicians);
    }


}
