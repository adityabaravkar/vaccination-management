package edu.sjsu.cmpe275.vms.service;

import edu.sjsu.cmpe275.vms.model.Disease;

public interface DiseaseService {
    Disease addDisease(String diseaseName,
                       String description);
}
