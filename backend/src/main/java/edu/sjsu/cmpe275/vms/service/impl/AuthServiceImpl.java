package edu.sjsu.cmpe275.vms.service.impl;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import edu.sjsu.cmpe275.vms.exception.BadRequestException;
import edu.sjsu.cmpe275.vms.model.*;
import edu.sjsu.cmpe275.vms.payload.SignUpRequest;
import edu.sjsu.cmpe275.vms.repository.UserRepository;
import edu.sjsu.cmpe275.vms.service.AuthService;
import edu.sjsu.cmpe275.vms.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(SignUpRequest signUpRequest) {

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setMiddleName(signUpRequest.getMiddleName());
        user.setLastName(signUpRequest.getLastName());
        user.setDateOfBirth(DateUtils.parseDate(signUpRequest.getDateOfBirth()));
        user.setGender(Gender.valueOf(signUpRequest.getGender()));
        user.setAddress(new Address(signUpRequest.getStreetAndNumber(), signUpRequest.getCity(),
                signUpRequest.getState(), signUpRequest.getZipCode()));
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setRole(StringUtils.isBlank(signUpRequest.getRole())?
                Role.Patient:Role.valueOf(signUpRequest.getRole()));

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}
