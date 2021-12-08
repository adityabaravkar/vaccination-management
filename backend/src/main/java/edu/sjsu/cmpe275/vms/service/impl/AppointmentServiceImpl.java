package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.exception.BadRequestException;
import edu.sjsu.cmpe275.vms.model.*;
import edu.sjsu.cmpe275.vms.repository.*;
import edu.sjsu.cmpe275.vms.service.AppointmentService;
import edu.sjsu.cmpe275.vms.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    VaccinationRepository vaccinationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ClinicRepository clinicRepository;
    @Autowired
    SlotRepository slotRepository;

    @Override
    public Appointment makeAppointment(long patientId, String appointmentTime, String currentTime, List<Long> vaccinationIds, long clinicId) {
        User patient = null;
        Clinic clinic = null;
        Vaccination vaccine = null;
        long slotIdToBook = 0;
        List<Long> slotIds = new ArrayList<>();

        if(this.userRepository.existsById(patientId)){
             patient = userRepository.findById(patientId).get();
        } else {
            throw new BadRequestException("Patient with id " + patientId + " does not exist in the database.");
        }
        if(this.clinicRepository.existsById(clinicId)){
            clinic = clinicRepository.findById(clinicId).get();
        } else {
            throw new BadRequestException("Clinic with id " + clinicId + " does not exist in the database.");
        }
        List<Vaccination> vaccinationList = new ArrayList<>();
        for( int i=0 ; i< vaccinationIds.size();i++){
            vaccine = vaccinationRepository.findById(vaccinationIds.get(i)).get();
            vaccinationList.add(vaccine);
        }
//        System.out.println("Appointment time:" + appointmentTime);
//        System.out.println("current date time:" + currentTime);


        String appointmentDate = appointmentTime.substring(0,10);
        String currentDate = currentTime.substring(0,10);
        int aptHr = Integer.parseInt(appointmentTime.substring(11,13));
        int aptMin = Integer.parseInt(appointmentTime.substring(14,16));

        //System.out.println(" Temporal Apt date "+ LocalDate.parse(appointmentDate));
        long months = ChronoUnit.MONTHS.between(LocalDate.parse(currentDate),LocalDate.parse(appointmentDate));
        //System.out.println("months" + months);

        if(months >= 0 && months <= 12) { //check dates if month is 0 or 12
           // System.out.println("apt time is within 12 months of current time");
            String businessHours =  clinic.getBusinessHours();
            String[] split = businessHours.split("to");
            int starthour = Integer.parseInt(split[0]);
            int differenceInHrs =  aptHr - starthour;

            // fetch all the slot ids for this clinic
            slotIds = this.slotRepository.findByClinicId(clinicId);
            for( int  i=0 ; i<slotIds.size(); i++){
                int a = 0;
                a = a + differenceInHrs*4;

                switch (aptMin){
                    case 0 : slotIdToBook = slotIds.get(a);
                    break;
                    case 15 : slotIdToBook = slotIds.get(a + 1);
                    break;
                    case 30 : slotIdToBook = slotIds.get(a + 2);
                        break;
                    case 45 : slotIdToBook = slotIds.get(a + 3);
                        break;
                }
                break;
               // System.out.println("slotIdToBook" + slotIdToBook);
            }

            Slot s = this.slotRepository.findById(slotIdToBook).get();
            //check if slots are available
            int numberOfAptsInThisSlot = s.getNoOfApt();
            if (numberOfAptsInThisSlot <= clinic.getNumberOfPhysicians()) {
                numberOfAptsInThisSlot++;
                Appointment appointment = new Appointment(patient, DateUtils.parseTimestamp(appointmentTime), clinic, vaccinationList);
                s.setNoOfApt(numberOfAptsInThisSlot);
                this.slotRepository.save(s);
                return this.appointmentRepository.save(appointment);
            }
            else{
                throw new BadRequestException(" Sorry physicians are not available.");
            }
        }   else {
            throw new BadRequestException("The appointment time should be before within 12 monts of the current time.");
        }
    }

    @Override
    public Appointment getAppointment(long id) {
        Appointment appointment = this.appointmentRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Sorry, Appointment with this ID does not exist!"));
        return appointment;
    }

    @Override
    public void cancelAppointment(long id) {
        Appointment appointment = this.appointmentRepository.findById(id).orElse(null);
        if(appointment != null){
            this.appointmentRepository.deleteById(id);
        }
    }

    @Override
    public Appointment updateAppointment(long appointmentId, String appointmentTime, String currentTime) {
        System.out.println("inside update appointment");
        return null;
    }

}