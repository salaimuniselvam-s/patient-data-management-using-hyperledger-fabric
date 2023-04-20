db.createUser({
  user: "admin",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "UserCredentials",
    },
  ],
});

// docker exec -it hospital-user-credentials bash
// mongosh --host localhost --port 27017 -u admin -p password --authenticationDatabase UserCredentials
// use UserCredentials
// db.userdetails.find()
