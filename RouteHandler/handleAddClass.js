const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const addClassSchema = require("../Schemas/addClassSchema");
const ourClass = new mongoose.model("ourClass", addClassSchema);
// file upload..
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") + "-"; //+ Date.now();
    cb(null, fileName + fileExt);
  },
});

const UPLOAD_FOLDER = `${__dirname}/Uploads/AddClass`;

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, png ,jpg formate allowed!"));
    }
  },
});

// post method
router.post("/classAdd", upload.single("file"), (req, res, next) => {
  const newClass = new ourClass({
    title: req.body.title,
    description: req.body.description,
    img: req.file.filename,
  });
  newClass.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Class was inserted successfully!",
      });
    }
  });
});

//get method all class
router.get("/classget", (req, res) => {
  ourClass.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "thare was a server side error",
      });
    } else {
      res.status(200).json(data);
    }
  });
});
// single data get

router.get("/classSingle/:id", (req, res) => {
  ourClass.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "thare was a server side error",
      });
    } else {
      res.status(200).json(data[0]);
    }
  });
});

//get delete method

router.delete("/classDelete/:id", (req, res) => {
  ourClass.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Delete successfully!",
      });
    }
  });
});

// // update method with photo

// router.patch('/classupdate/:id', upload.single('file'), (req, res) => {
//     ourClass.updateOne({ _id: req.params.id }, {
//         $set: { title: req.body.title, description: req.body.description, img: req.file.filename }
//     }, (err) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error!"
//             })
//         } else {
//             res.status(200).json({
//                 message: "update successfully!"
//             })
//         }
//     })
// })

// update method with photo
router.patch("/classupdate/:id", upload.single("file"), (req, res) => {
  // photo true than work if otherwaise else work
  if (req.file) {
    ourClass.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          img: req.file.filename,
        },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "update successfully!",
          });
        }
      }
    );
  } else {
    ourClass.updateOne(
      { _id: req.params.id },
      {
        $set: { title: req.body.title, description: req.body.description },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "update successfully!",
          });
        }
      }
    );
  }
});

module.exports = router;
