package edu.sjsu.cmpe275.vms.service.impl;

import edu.sjsu.cmpe275.vms.model.Disease;
import edu.sjsu.cmpe275.vms.model.Vaccination;
import edu.sjsu.cmpe275.vms.repository.DiseaseRepository;
import edu.sjsu.cmpe275.vms.repository.VaccinationRepository;
import edu.sjsu.cmpe275.vms.service.VaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
public class VaccinationServiceImpl implements VaccinationService {
    @Autowired
    VaccinationRepository vaccinationRepository;
    @Autowired
    DiseaseRepository diseaseRepository;
    @Override
    public Vaccination createVaccination(String name, List<String> diseasesList, String manufacturer,
                                          int numberOfShots,
                                          int shotInternalVal,
                                          int duration) {
        List<Disease> diseases = new ArrayList<>();
        for(int i = 0; i < diseasesList.size(); i++) {
            Disease disease = diseaseRepository.findByName(diseasesList.get(i)).get();
            diseases.add(disease);
        }
        Vaccination vaccination = new Vaccination(name, diseases ,manufacturer, numberOfShots, shotInternalVal, duration);
        for(Disease disease : diseases) {
            disease.setVaccination(vaccination);
        }
        vaccination.setDiseases(diseases);
        return this.vaccinationRepository.save(vaccination);
    }
}
