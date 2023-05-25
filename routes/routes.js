const { response } = require("express");
const express = require("express");
const router = express.Router();
const { User, Data } = require("../model/model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//post method
router.post("/post", async (req, res) => {
  const data = new Data({
    eventName: req.body.eventName,
    date: req.body.date,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get methord
router.get("/get", (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//getById methord
router.get("/getById/:id", (req, res) => {
  Data.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//Delete methord
router.delete("/delete/:id", (req, res) => {
  Data.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//user registration
router.post("/registration", (req, res) => {
  const { userName, email, password } = req.body;

  //check if user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // create a new user
      const newUser = new User({ userName, email, password });

      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, userName: user.userName };
              jwt.sign(
                payload,
                "secretKey",
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

//user loging
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // compare passwords
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(404).json({ message: "Invalid credentials" });
        }

        const payload = { id: user.id, userName: user.userName };
        jwt.sign(payload, "secretKey", { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      });
    })
    .catch((err) => console.log(err));
});

//get all users
router.get("/getallusers", (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
