package edu.sjsu.cmpe275.vms.service;

import com.nimbusds.jose.shaded.json.JSONObject;
import edu.sjsu.cmpe275.vms.model.Appointment;
import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AppointmentService {

    Appointment makeAppointment(long patientId, String appointmentTime, String currentTime, List<Long> vaccinationIds,
                                long clinicId);

    Appointment getAppointment(long id);

    ResponseEntity<?> getAllClinics();

    Appointment cancelAppointment(long id);

    Appointment updateAppointment(long appointmentId, String appointmentTime, String currentTime, long clinicId);
}
