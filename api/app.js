require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors= require("cors")

const isAuthorized = require("./middleware/is-auth");

const User = require("./models/user");
const Subject = require("./models/subject");
const Department = require("./models/department");
const Enrollment = require("./models/enrollment");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const doctorRoutes = require("./routes/doctor");
const studentRoutes = require("./routes/student");

const { addDataFolder } = require("./util/folders");
const sequelize = require("./util/database");
const user = require("./util/user");

const app = express();

app.use(bodyParser.json());

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); */
app.use(cors())
app.use(authRoutes);

app.use(isAuthorized);

app.use("/admin", adminRoutes);

app.use("/doctor", doctorRoutes);

app.use("/student", studentRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode).json({ message: error.message });
});

Subject.belongsTo(Department, { constraints: true, onDelete: "CASCADE" });
Subject.belongsTo(Subject, { as: "prerequisite" });
Subject.belongsTo(User, { as: "doctor" });
User.belongsToMany(Subject, { through: Enrollment });
Department.hasMany(Subject);

sequelize
  .sync()
  .then(() => {
    return User.findAll({ where: { role: "admin" } }).then((res) => {
      if (res.length < 1) {
        addDataFolder();
        user.createUser({
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: "admin",
        });
      }
      app.listen(process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
