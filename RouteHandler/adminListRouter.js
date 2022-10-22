const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const adminListSchema = require("../Schemas/adminListSchema");
const admin = new mongoose.model("admin", adminListSchema);

// admin post

router.post("/makeAdmin", (req, res) => {
  const adminData = new admin({
    name: req.body.name,
    email: req.body.email,
  });
  adminData.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Admin Make Successful",
      });
    }
  });
});

// admin data load or get
router.get("/allAdmin", (req, res) => {
  admin.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

// admn role set

// isAdmin
router.post("/isAdmin", (req, res) => {
  admin.find({ email: req.body.email }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.json(data.length > 0);
    }
  });
});

module.exports = router;
