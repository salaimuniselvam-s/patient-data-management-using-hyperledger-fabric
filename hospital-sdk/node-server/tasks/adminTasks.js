// ADMIN TASKS

// Login Admin
// BASE_URL/auth/login
// {"newPassword":"","role":"admin","username":"hosp1admin","password":"hosp1adminpw","hospitalId":"1"}
const ADMIN_DETAILS = [
  {
    userName: "hosp1admin",
    password: "hosp1adminpw",
  },
  {
    userName: "hosp2admin",
    password: "hosp2adminpw",
  },
  {
    userName: "ramesh",
    password: "sms7",
  },
];

// Create Doctor
// req.headers.role="admin"
// const REGISTER_DOCTOR = {
//   "hospitalId": 1,
//   "username:" "ramesh",
//   "password": "sms7",
//   "firstName": "rajesh",
//   "lastName": "kumar",
//   "speciality": "Neurosurgery",
// };
// {
//     "success": "Successfully registered user: ramesh",
//     "id": "ramesh",
//     "password": "sms7"
// }

// Create PATIENT
// req.headers.role="admin"
// const REGISTER_PATIENT = {
//   "hospitalId": 1,
//   "username": "RAJ",
// };
// {
//   "success": "Successfully registered Patient.",
//   "id": "PID6",
//   "password": "n93b2xlk"
// }

let REFRESH_TOKEN = [];
// RefreshTokens -> Post
// BASE_URL/auth/refreshToken
// {
//     "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWVzaCIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODA3MDE2NjgsImV4cCI6MTY4MDc4ODA2OH0.4-lr4FGh22T1dKIKSLFlbcIauSbHQc29LkyLW4IcigY"
// }

// Logout -> delete

module.exports = {
  ADMIN_DETAILS,
  REFRESH_TOKEN,
};
