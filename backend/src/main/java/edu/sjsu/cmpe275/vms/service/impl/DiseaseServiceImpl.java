package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.model.Clinic;
import edu.sjsu.cmpe275.vms.model.Disease;
import edu.sjsu.cmpe275.vms.repository.ClinicRepository;
import edu.sjsu.cmpe275.vms.repository.DiseaseRepository;
import edu.sjsu.cmpe275.vms.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiseaseServiceImpl implements DiseaseService {
    @Autowired
    DiseaseRepository diseaseRepository;

    @Override
    public Disease addDisease(String name, String description) {
        Disease disease = new Disease(name, description);
        return this.diseaseRepository.save(disease);
    }
}
