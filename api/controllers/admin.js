const fs = require("fs");
const path = require("path");

const Department = require("../models/department");
const Subject = require("../models/subject");
const User = require("../models/user");

const user = require("../util/user");

exports.addDoctor = (req, res, next) => {
  const { name, email, password } = req.body;
  user
    .createUser({
      name: name,
      email: email,
      password: password,
      role: "doctor",
    })
    .then(() => {
      res
        .status(201)
        .json({ message: "Doctor account has been added successfully." });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.addDepartment = (req, res, next) => {
  const { name, code } = req.body;
  Department.create({ name: name, code: code })
    .then(() => {
      res
        .status(201)
        .json({ message: "Department has been added successfully." });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.addSubject = (req, res, next) => {
  const { name, code, departmentCode, prerequisiteCode } = req.body;
  let departmentId,
    prerequisiteId = null;
  Department.findOne({ where: { code: departmentCode } })
    .then((department) => {
      departmentId = department.id;
      if (prerequisiteCode)
        return Subject.findOne({ where: { code: prerequisiteCode } });
      else return Promise.resolve({ id: null });
    })
    .then((subject) => {
      prerequisiteId = subject.id;
      let classRoom = path.join(__dirname, "..", "data", `${name}-${code}`);
      fs.mkdirSync(classRoom);
      return Subject.create({
        name: name,
        code: code,
        departmentId: departmentId,
        prerequisiteId: prerequisiteId,
        classRoom: classRoom,
      });
    })
    .then(() => {
      res.status(201).json({ message: "Subject has been added successfully." });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.addStudent = (req, res, next) => {
  const { id, name, email, password } = req.body;
  user
    .createUser({
      id: id,
      name: name,
      email: email,
      password: password,
      role: "student",
    })
    .then(() => {
      res
        .status(201)
        .json({ message: "Student account has been added successfully." });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.addDoctorToClass = (req, res, next) => {
  const { doctorEmail, subjectCode } = req.body;
  User.findOne({ where: { email: doctorEmail } })
    .then((doctor) => {
      return Subject.update(
        { doctorId: doctor.id },
        { where: { code: subjectCode } }
      );
    })
    .then(() => {
      res.status(200).json({
        message: "Doctor have been added to classroom of subject successfully.",
      });
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};
