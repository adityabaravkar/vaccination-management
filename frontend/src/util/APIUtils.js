import { API_BASE_URL, ACCESS_TOKEN, BASE_URL } from "../constants";

import { Authentication } from "../services";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (Authentication.token) {
    headers.append("Authorization", Authentication.bearerToken);
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!Authentication.token) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}
export function addDisease(addDiseaseRequest) {
  return request({
    url: API_BASE_URL + "/diseases/addDisease",
    method: "POST",
    body: JSON.stringify(addDiseaseRequest),
  });
}
export function addClinic(addClinicRequest) {
  return request({
    url: API_BASE_URL + "/clinic",
    method: "POST",
    body: JSON.stringify(addClinicRequest),
  });
}
export function addVaccination(addVaccinationRequest) {
  return request({
    url: API_BASE_URL + "/vaccination/createVaccination",
    method: "POST",
    body: JSON.stringify(addVaccinationRequest),
  });
}

export function makeAppointment(addAptRequest) {
  console.log("addAptRequest", addAptRequest);
  return request({
    url: API_BASE_URL + "/appointment/makeAppointment",
    method: "POST",
    body: JSON.stringify(addAptRequest),
  });
}

export function getClinics() {
  return request({
    url: API_BASE_URL + "/appointment/allClinic",
    method: "GET",
  });
}

export function getAllAppointments() {
  return request({
    url: API_BASE_URL + "/appointment/",
    method: "GET",
  });
}

export function getAllDiseases() {
  return request({
    url: API_BASE_URL + "/diseases/allDiseases",
    method: "GET",
  });
}
