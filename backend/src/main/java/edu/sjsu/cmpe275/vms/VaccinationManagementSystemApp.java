package edu.sjsu.cmpe275.vms;

import edu.sjsu.cmpe275.vms.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class VaccinationManagementSystemApp {

	public static void main(String[] args) {
		SpringApplication.run(VaccinationManagementSystemApp.class, args);
	}

}
