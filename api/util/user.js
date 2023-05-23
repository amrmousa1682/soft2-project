require("dotenv").config();

const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.createUser = (user) => {
  let { id, name, email, password, role } = user;
  return bcrypt
    .hash(password, +process.env.SALT_ROUND)
    .then((hashedPassword) => {
      if (id)
        return User.create({
          id: id,
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        });
      else
        return User.create({
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        });
    })
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      err.statusCode = 500;
      return Promise.reject(err);
    });
};
