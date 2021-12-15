package edu.sjsu.cmpe275.vms.model;



import javax.persistence.*;


@Entity
@Table(name = "disease")
public class Disease {

    @Id
    @GeneratedValue
    private long id;


    @Column(name = "name", nullable = false, unique = true)
    private String diseaseName;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "vaccination_id", referencedColumnName = "id")
    private Vaccination vaccination;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Vaccination getVaccination() {
        return vaccination;
    }

    public void setVaccination(Vaccination vaccination) {
        this.vaccination = vaccination;
    }

    public Disease(String diseaseName, String description) {
        this.diseaseName = diseaseName;
        this.description = description;
    }

    public Disease() {

    }

}
