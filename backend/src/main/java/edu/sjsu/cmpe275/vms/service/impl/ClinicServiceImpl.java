package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.repository.ClinicRepository;
import edu.sjsu.cmpe275.vms.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired ClinicRepository clinicRepository;

    @Override
    public Clinic createClinic(String name, Address address, String businessHours, int numberOfPhysicians) {
        Clinic clinic = new Clinic(name, address, businessHours, numberOfPhysicians);
        return this.clinicRepository.save(clinic);
    }
}
