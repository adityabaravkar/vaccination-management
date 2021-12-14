package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.exception.ResourceNotFoundException;
import edu.sjsu.cmpe275.vms.model.Appointment;
import edu.sjsu.cmpe275.vms.model.User;
import edu.sjsu.cmpe275.vms.repository.PatientRepository;
import edu.sjsu.cmpe275.vms.repository.UserRepository;
import edu.sjsu.cmpe275.vms.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    PatientRepository patientRepository;
    @Autowired
    UserRepository userRepository;
    @Override
    public List<Appointment> getVaccinationHistory(long id) {
        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
        return user.getAppointmentList();
    }
}
