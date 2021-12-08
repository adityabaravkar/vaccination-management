package edu.sjsu.cmpe275.vms.service;

import edu.sjsu.cmpe275.vms.model.Appointment;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentService {

    Appointment makeAppointment(long patientId, String appointmentTime, String currentTime, List<Long> vaccinationIds,
                                long clinicId);

    Appointment getAppointment(long id);

    void cancelAppointment(long id);

    Appointment updateAppointment(long appointmentId, String appointmentTime, String currentTime);
}
