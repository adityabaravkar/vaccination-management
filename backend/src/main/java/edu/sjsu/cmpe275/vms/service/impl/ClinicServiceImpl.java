package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.exception.BadRequestException;
import edu.sjsu.cmpe275.vms.exception.ResourceNotFoundException;
import edu.sjsu.cmpe275.vms.model.Address;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Slot;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.repository.ClinicRepository;
import edu.sjsu.cmpe275.vms.repository.SlotRepository;
import edu.sjsu.cmpe275.vms.repository.VaccinationRepository;
import edu.sjsu.cmpe275.vms.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired ClinicRepository clinicRepository;
    @Autowired
    VaccinationRepository vaccinationRepository;
    @Autowired
    SlotRepository slotRepository;


    @Override
    @Transactional(readOnly = true)
    public List<Vaccination> getVaccinations(long id) {
        Clinic clinic =  this.clinicRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Sorry, clinic does not exist!"));
        return clinic.getVaccinations();
    }

    @Override
    public Clinic createClinic(String name, Address address, String businessHours, int numberOfPhysicians) {
        String[] split = businessHours.split("to");
        int starthour = Integer.parseInt(split[0]);
        int endhour = Integer.parseInt(split[1]);
        ArrayList<Slot> slots = new ArrayList<>();

        Clinic clinic = new Clinic(name, address, businessHours, numberOfPhysicians);
        Clinic clinicValue = this.clinicRepository.saveAndFlush(clinic); // trying to save the clinic entity first
        long clinicId = clinic.getId();
        System.out.println("clinicId"+clinicId);

        int totalhrs =  endhour - starthour;
        if(totalhrs <= 8){
            int allowedSlots = totalhrs * 4;
            for(int i =0 ; i< allowedSlots ; i++)
            {
              Slot slot = new Slot("Unbooked",0,clinicValue);
              slots.add(slot);
            }
        }
        this.slotRepository.saveAll(slots);
        return clinic;
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
