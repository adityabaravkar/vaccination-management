package edu.sjsu.cmpe275.vms.repository;


import edu.sjsu.cmpe275.vms.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {

}

