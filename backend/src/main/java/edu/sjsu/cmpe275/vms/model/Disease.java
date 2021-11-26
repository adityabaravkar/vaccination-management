package edu.sjsu.cmpe275.vms.model;



import javax.persistence.*;


@Entity
@Table(name = "disease")
public class Disease {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "vaccination_id", referencedColumnName = "id")
    private Vaccination vaccination;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Disease(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Disease() {

    }

}
