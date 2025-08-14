const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const userDetailModel = require('./model/userDetail');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

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

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
