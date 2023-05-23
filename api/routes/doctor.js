const express = require("express");
const multer = require("multer");
const { param, body } = require("express-validator");

const validateRequest = require("../middleware/validate-request");

const Subject = require("../models/subject");

const doctorController = require("../controllers/doctor");

const router = express.Router();
let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      Subject.findOne({ where: { id: req.params.subjectId } })
        .then((subject) => {
          cb(null, subject.classRoom);
        })
        .catch((err) => {
          cb(err, null);
        });
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Date.now() +
          "-" +
          Math.floor(Math.random() * 10 ** 9) +
          file.originalname
      );
    },
  }),
});

router.get(
  "/subjects",
  [body("permission", "You dont have permission to do this.").equals("doctor")],
  validateRequest,
  doctorController.getSubjects
);

router.post(
  "/file/:subjectId",
  [
    body("permission", "You dont have permission to do this.").equals("doctor"),
    param("subjectId")
      .trim()
      .custom((subjectId, { req }) => {
        return Subject.findOne({
          where: { id: subjectId, doctorId: req.body.userId },
        }).then((subject) => {
          if (!subject) return Promise.reject();
          return Promise.resolve();
        });
      })
      .withMessage("Subject ID is not wrong or you dont have access to this subject."),
  ],
  validateRequest,
  upload.single("file"),
  doctorController.addFile
);

module.exports = router;
