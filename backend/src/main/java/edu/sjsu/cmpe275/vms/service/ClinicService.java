package edu.sjsu.cmpe275.vms.service;

import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;

import edu.sjsu.cmpe275.vms.payload.SignUpRequest;
import org.springframework.web.bind.annotation.RequestParam;

public interface ClinicService {
    Clinic createClinic(String name,
                       // Address address,
                        String businessHours,
                        int NumberOfPhysicians);
}
