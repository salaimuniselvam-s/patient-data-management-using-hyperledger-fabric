## Hospital Client

This is a web application for a hospital client to interact with the hospital chaincode deployed on hospital Fabric Network for managing Patient Data. It is built with Next.js, React, Redux, and other popular libraries.

### Installation

To get started with this project, you will need to have Node.js installed on your computer.

1. Install dependencies

```bash
$ npm install
```

2. After installing the dependencies, you can start the development server with the following command:

```bash
$ npm run dev
```

The development server will start at http://localhost:3000 by default. Open this URL in your web browser to view the application.

### Test User Credentials

Below Test User Credentials are Created When running npm enroll in the hospital Node Server.

(Note: To Interact with hospital chaincode, make sure the hospital fabric network and hospital node server is set up and running..)

| username       | password      | role    |
| -------------- | ------------- | ------- |
| hosp1admin     | hosp1adminpw  | admin   |
| hosp2admin     | hosp2adminpw  | admin   |
|                |               |         |
| Raj Kumar      | temp-password | patient |
| Deepan Raj     | temp-password | patient |
| Mahesh Kumar   | temp-password | patient |
| Viki           | temp-password | patient |
| Ramesh         | temp-password | patient |
|                |               |         |
| Rajesh Kumar   | temp-password | doctor  |
| Kailash Balaji | temp-password | doctor  |
| Deepak         | temp-password | doctor  |
| Mahesh Babu    | temp-password | doctor  |
| hosp2doctor    | temp-password | doctor  |
|                |               |         |

### Features

- User authentication and authorization
- Dashboard for hospital administrators
- Patient management
- Medical record management
- Provides Swagger documentation for easy API reference

### Technologies Used

- Next.js
- React
- Redux
- Axios
- Yup
- Formik
- Tailwind CSS
- Framer Motion
- React Select
- React Toastify
- bcryptjs

### License

This project is licensed under the MIT License
