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

import static java.lang.Math.abs;

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
        int totalhrs = 0;
        int difInMin = 0;
        ArrayList<Slot> slots = new ArrayList<>();

        String[] split = businessHours.split("to");
        int starthour = Integer.parseInt(split[0].substring(0,2)); // get start hr
        int endhour = Integer.parseInt(split[1].substring(0,2)); // get end hr
        int startTime = Integer.parseInt(split[0].substring(3));// get start min
        int endTime = Integer.parseInt(split[1].substring(3));// get end min


        Clinic clinic = new Clinic(name, address, businessHours, numberOfPhysicians);
        Clinic clinicValue = this.clinicRepository.saveAndFlush(clinic); // trying to save the clinic entity first
        long clinicId = clinic.getId();

        //calculating the total business hours
        if(startTime > endTime) {
            totalhrs =  endhour - starthour - 1;
            difInMin = 60 - startTime;
        } else if(startTime < endTime) {
            totalhrs = endhour - starthour ;
            difInMin = endTime - startTime;
        } else {
            totalhrs = endhour - starthour;
        }

        //adding slots only if business hours is <=8
        if(totalhrs <= 8){
            int allowedSlots = 0;
            switch (difInMin){
                case 0: allowedSlots = totalhrs * 4;
                break;
                case 15: allowedSlots = (totalhrs * 4) + 1;
                break;
                case 30: allowedSlots = (totalhrs * 4) + 2;
                    break;
                case 45: allowedSlots = (totalhrs  * 4) + 3;
                    break;
            }
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
