package edu.sjsu.cmpe275.vms.payload;

import javax.validation.constraints.NotBlank;

public class AddDiseaseRequest {
    @NotBlank
    private String name;

    private String description;

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



}
