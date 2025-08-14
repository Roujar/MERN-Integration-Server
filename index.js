const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userDetailModel = require('./model/userDetail');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterForm")
  app.post('/signup', (req, res) => {
  userDetailModel.create(req.body)
    .then(user => res.json("success"))
    .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  userDetailModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json("user not found");
      }
    })
    .catch(err => res.json(err));
});

app.listen(3000, () => {
  console.log(`🚀 Server running on port 3000`);
});
