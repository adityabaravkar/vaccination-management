package edu.sjsu.cmpe275.vms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "vaccination")
public class Vaccination {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

   // @Column(name = "diseases", nullable = false)

    @OneToMany(mappedBy = "vaccination", fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JsonIgnoreProperties({"vaccination"})
    private List<Disease> diseases;

    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    @Column(name = "numberOfShots", nullable = false)
    private int numberOfShots;

    @Column(name = "shotInternalVal")
    private int shotInternalVal;

    @Column(name = "duration", nullable = false)
    private int duration;

    public Vaccination(String name, List<Disease> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration) {
        this.name = name;
        this.diseases = diseases;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
    }

    public Vaccination() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Disease> getDiseases() {
        return diseases;
    }

    public void setDiseases(List<Disease> diseases) {
        this.diseases = diseases;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public int getNumberOfShots() {
        return numberOfShots;
    }

    public void setNumberOfShots(int numberOfShots) {
        this.numberOfShots = numberOfShots;
    }

    public int getShotInternalVal() {
        return shotInternalVal;
    }

    public void setShotInternalVal(int shotInternalVal) {
        this.shotInternalVal = shotInternalVal;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
