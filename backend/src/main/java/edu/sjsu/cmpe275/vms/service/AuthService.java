package edu.sjsu.cmpe275.vms.service;

import edu.sjsu.cmpe275.vms.model.User;
import edu.sjsu.cmpe275.vms.payload.SignUpRequest;

public interface AuthService {

    User registerUser(SignUpRequest signUpRequest);
}
