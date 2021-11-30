package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.exception.BadRequestException;
import edu.sjsu.cmpe275.vms.exception.ResourceNotFoundException;
import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.repository.ClinicRepository;
import edu.sjsu.cmpe275.vms.repository.VaccinationRepository;
import edu.sjsu.cmpe275.vms.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired ClinicRepository clinicRepository;
    @Autowired
    VaccinationRepository vaccinationRepository;
    @Override
    public Clinic createClinic(String name, Address address, String businessHours, int numberOfPhysicians) {
        Clinic clinic = new Clinic(name, address, businessHours, numberOfPhysicians);
        return this.clinicRepository.save(clinic);
    }

    @Override
    public Clinic addVaccinations(long clinic_id, List<Long> vaccination_ids) {
        Clinic clinic = this.clinicRepository.findById(clinic_id)
                .orElseThrow(() -> new BadRequestException("Sorry, clinic does not exist"));
        List<Vaccination> newVaccinations = new ArrayList<>();
        for(Long vaccination_id  : vaccination_ids) {
            Vaccination vaccination = this.vaccinationRepository.findById(vaccination_id)
                    .orElseThrow(() -> new BadRequestException("Sorry, vaccine does not exist"));
            newVaccinations.add(vaccination);
        }

        List<Vaccination> existingVaccinations = clinic.getVaccinations();
        if (existingVaccinations == null) {
            existingVaccinations = new ArrayList<>();
        }
        existingVaccinations.addAll(newVaccinations);
        clinic.setVaccinations(existingVaccinations);
        return this.clinicRepository.save(clinic);
    }
}
