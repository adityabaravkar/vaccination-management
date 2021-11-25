package edu.sjsu.cmpe275.vms.model;


import javax.persistence.*;

@Entity
@Table(name = "clinic")
public class Clinic {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

//    @Column(name = "address", nullable = false)
//    private Address address;

    @Column(name = "businessHours", nullable = false)
    private String businessHours;

    @Column(name = "numberOfPhysicians", nullable = false)
    private int numberOfPhysicians;

    public Clinic(String name, /*Address address,*/ String businessHours, int numberOfPhysicians) {
        this.name = name;
       // this.address = address;
        this.businessHours = businessHours;
        this.numberOfPhysicians = numberOfPhysicians;
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

//    public Address getAddress() {
//        return address;
//    }
//
//    public void setAddress(Address address) {
//        this.address = address;
//    }

    public String getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(String businessHours) {
        this.businessHours = businessHours;
    }

    public int getNumberOfPhysicians() {
        return numberOfPhysicians;
    }

    public void setNumberOfPhysicians(int numberOfPhysicians) {
        this.numberOfPhysicians = numberOfPhysicians;
    }
}
