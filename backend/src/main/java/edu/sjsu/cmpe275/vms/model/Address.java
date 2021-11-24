package edu.sjsu.cmpe275.vms.model;

import javax.persistence.Embeddable;

@Embeddable
public class Address {

    private String streetAndNumber;

    private String city;

    private String state;

    private Integer zipCode;

    public Address(String streetAndNumber, String city, String state, Integer zipCode) {
        this.streetAndNumber = streetAndNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public Address() {

    }

    public String getStreetAndNumber() {
        return streetAndNumber;
    }

    public void setStreetAndNumber(String streetAndNumber) {
        this.streetAndNumber = streetAndNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }
}
