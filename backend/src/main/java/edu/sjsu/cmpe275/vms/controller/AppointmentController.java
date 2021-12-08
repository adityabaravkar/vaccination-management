package edu.sjsu.cmpe275.vms.controller;



import edu.sjsu.cmpe275.vms.model.Appointment;

import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.security.CurrentUser;
import edu.sjsu.cmpe275.vms.service.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {

    @Autowired private AppointmentService appointmentService;

    @PostMapping(path = "/appointment/makeAppointment")
    @PreAuthorize("hasRole('PATIENT')")
    public Appointment makeAppointment(@CurrentUser @RequestParam long patientId,
                                       @RequestParam String appointmentTime,
                                       @RequestParam String currentTime,
                                       @RequestParam  List<Long> vaccinationIds,
                                       @RequestParam  long clinicId) {
        return this.appointmentService.makeAppointment(patientId,appointmentTime,currentTime,vaccinationIds,clinicId);
    }

    @GetMapping(path = "/appointment/{id}")
    public Appointment getAppointments(@PathVariable(value = "id") long id) {
        return this.appointmentService.getAppointment(id);
    }

    @PostMapping(path = "appointment/cancelAppointment/{id}")
    @PreAuthorize("hasRole('PATIENT')")
    public void cancelAppointment(@PathVariable(value = "id") long id) {
        //return
        this.appointmentService.cancelAppointment(id);
    }

    @PostMapping(path = "/appointment/updateAppointment")
    @PreAuthorize("hasRole('PATIENT')")
    public Appointment updateAppointment(@CurrentUser @RequestParam long appointmentId,
                                       @RequestParam String appointmentTime,
                                       @RequestParam String currentTime) {
        return this.appointmentService.updateAppointment(appointmentId,appointmentTime,currentTime);
    }
}
