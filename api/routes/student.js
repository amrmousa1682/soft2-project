const express = require("express");
const { param, body } = require("express-validator");

const validateRequest = require("../middleware/validate-request");

const Subject = require("../models/subject");
const Enrollment = require("../models/enrollment");

const studentController = require("../controllers/student");

const router = express.Router();

router.get(
  "/subjects",
  [
    body("permission", "You dont have permission to do this.").equals(
      "student"
    ),
  ],
  validateRequest,
  studentController.getSubjects
);

router.post(
  "/enrollment/:subjectId",
  [
    body("permission", "You dont have permission to do this.").equals(
      "student"
    ),
    param("subjectId")
      .trim()
      .custom((subjectId) => {
        return Subject.findOne({
          where: { id: subjectId },
        }).then((subject) => {
          if (!subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Subject ID is wrong."),
  ],
  validateRequest,
  studentController.enrollInSubject
);

router.get(
  "/class/:subjectId",
  [
    body("permission", "You dont have permission to do this.").equals(
      "student"
    ),
    param("subjectId")
      .trim()
      .custom((subjectId) => {
        return Subject.findOne({
          where: { id: subjectId },
        }).then((subject) => {
          if (!subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Subject ID is wrong."),
    param("subjectId")
      .trim()
      .custom((subjectId, { req }) => {
        return Enrollment.findOne({
          where: { subjectId: subjectId, userId: req.body.userId },
        }).then((result) => {
          if (result) return Promise.resolve();
          return Promise.reject();
        });
      })
      .withMessage("You are not registered in this subject."),
  ],
  validateRequest,
  studentController.getClass
);

router.get(
  "/download/:subjectId/:fileName",
  [
    body("permission", "You dont have permission to do this.").equals(
      "student"
    ),
    param("subjectId")
      .trim()
      .custom((subjectId) => {
        return Subject.findOne({
          where: { id: subjectId },
        }).then((subject) => {
          if (!subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Subject ID is wrong."),
    param("subjectId")
      .trim()
      .custom((subjectId, { req }) => {
        return Enrollment.findOne({
          where: { subjectId: subjectId, userId: req.body.userId },
        }).then((result) => {
          if (result) return Promise.resolve();
          return Promise.reject();
        });
      })
      .withMessage("You are not registered in this subject."),
  ],
  validateRequest,
  studentController.downloadFile
);

module.exports = router;
