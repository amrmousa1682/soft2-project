const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const validateRequest = require("../middleware/validate-request");

const User = require("../models/user");
const Department = require("../models/department");
const Subject = require("../models/subject");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post(
  "/doctor",
  [
    body("permission", "You dont have permission to do this.").equals("admin"),
    body("name", "Name is not valid.").trim().isAlpha(),
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is not valid.")
      .custom((email) => {
        return User.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            return Promise.reject();
          }
          return Promise.resolve();
        });
      })
      .withMessage("Email is already exists."),
    body(
      "password",
      "Password must include at least eight characters, one lowercase character, one uppercase character, a number, and a special character."
    ).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
  ],
  validateRequest,
  adminController.addDoctor
);
router.post(
  "/department",
  [
    body("permission", "You dont have permission to do this.").equals("admin"),
    body("name", "Name is not valid.").trim().isAlpha(),
    body("code")
      .trim()
      .isAlphanumeric()
      .withMessage("Code is not valid.")
      .custom((code) => {
        return Department.findOne({ where: { code: code } }).then(
          (department) => {
            if (department) {
              return Promise.reject();
            }
            return Promise.resolve();
          }
        );
      })
      .withMessage("Code is already exists."),
  ],
  validateRequest,
  adminController.addDepartment
);
router.post(
  "/subject",
  [
    body("permission", "You dont have permission to do this.").equals("admin"),
    body("name", "Name is not valid.").trim().isAlphanumeric(),
    body("code")
      .trim()
      .isAlphanumeric()
      .withMessage("Code is not valid.")
      .custom((code) => {
        return Subject.findOne({ where: { code: code } }).then((subject) => {
          if (subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Code is already exists."),
    body("departmentCode")
      .trim()
      .custom((departmentCode) => {
        return Department.findOne({ where: { code: departmentCode } }).then(
          (department) => {
            if (department) return Promise.resolve();
            return Promise.reject();
          }
        );
      })
      .withMessage("Department Code is not found."),
    body("prerequisiteCode")
      .trim()
      .custom((prerequisiteCode) => {
        if (!prerequisiteCode) {
          return Promise.resolve();
        }
        return Subject.findOne({ where: { code: prerequisiteCode } }).then(
          (subject) => {
            if (subject) return Promise.resolve();
            return Promise.reject();
          }
        );
      })
      .withMessage("Prerequisite Code is not found."),
  ],
  validateRequest,
  adminController.addSubject
);

router.post(
  "/student",
  [
    body("permission", "You dont have permission to do this.").equals("admin"),
    body("name", "Name is not valid.").trim().isAlpha(),
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is not valid.")
      .custom((email) => {
        return User.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            return Promise.reject();
          }
          return Promise.resolve();
        });
      })
      .withMessage("Email is already exists."),
    body(
      "password",
      "Password must include at least eight characters, one lowercase character, one uppercase character, a number, and a special character."
    ).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    body("id")
      .trim()
      .isNumeric()
      .withMessage("Academic number is not valid.")
      .custom((id) => {
        return User.findOne({ where: { id: id } }).then((user) => {
          if (user) {
            return Promise.reject();
          }
          return Promise.resolve();
        });
      })
      .withMessage("Academic number is already exists."),
  ],
  validateRequest,
  adminController.addStudent
);

router.patch(
  "/subject",
  [
    body("permission", "You dont have permission to do this").equals("admin"),
    body("doctorEmail")
      .trim()
      .normalizeEmail()
      .custom((doctorEmail) => {
        return User.findOne({
          where: { email: doctorEmail, role: "doctor" },
        }).then((doctor) => {
          if (!doctor) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Email does not belong to any doctor"),
    body("subjectCode")
      .trim()
      .custom((code) => {
        return Subject.findOne({ where: { code: code } }).then((subject) => {
          if (!subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Subject code is not found"),
  ],
  validateRequest,
  adminController.addDoctorToClass
);

module.exports = router;
