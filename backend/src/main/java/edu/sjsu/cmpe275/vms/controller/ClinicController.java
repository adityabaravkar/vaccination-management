package edu.sjsu.cmpe275.vms.controller;


import edu.sjsu.cmpe275.vms.exception.ResourceNotFoundException;
import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.User;
import edu.sjsu.cmpe275.vms.payload.ApiResponse;
import edu.sjsu.cmpe275.vms.payload.SignUpRequest;
import edu.sjsu.cmpe275.vms.repository.ClinicRepository;
import edu.sjsu.cmpe275.vms.repository.UserRepository;
import edu.sjsu.cmpe275.vms.security.CurrentUser;
import edu.sjsu.cmpe275.vms.security.UserPrincipal;
import edu.sjsu.cmpe275.vms.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
public class ClinicController {

    @Autowired private ClinicService clinicService;

    @PostMapping("/clinic")
    @PreAuthorize("hasRole('ADMIN')")
    public Clinic createClinic(@CurrentUser @RequestParam String name,
                               // @RequestParam Address address,
                               @RequestParam String businessHours,
                               @RequestParam int numberOfPhysicians
                               ) {
        return this.clinicService.createClinic(name, /*address*/ businessHours, numberOfPhysicians);
    }


}
