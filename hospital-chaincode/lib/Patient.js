/**
 * @desc [The base patient class]
 */

/*
 * SPDX-License-Identifier: Apache-2.0
 */



class Patient {
  constructor(
    patientId,
    firstName,
    lastName,
    password,
    age,
    phoneNumber,
    emergPhoneNumber,
    address,
    bloodGroup,
    changedBy = "",
    allergies = "",
    symptoms = "",
    diagnosis = "",
    treatment = "",
    followUp = ""
  ) {
    this.patientId = patientId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.emergPhoneNumber = emergPhoneNumber;
    this.address = address;
    this.bloodGroup = bloodGroup;
    this.changedBy = changedBy;
    this.allergies = allergies;
    this.symptoms = symptoms;
    this.diagnosis = diagnosis;
    this.treatment = treatment;
    this.followUp = followUp;
    this.pwdTemp = true;
    this.permissionGranted = [];
    return this;
  }
}
module.exports = Patient;
