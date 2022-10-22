const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose');
const registrationSchema = require('../Schema/RegistrationSchema');
const user = new mongoose.model('user', registrationSchema);

// photo upload use multer...

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLocaleLowerCase()
            .split(' ')
            .join('-') + '-' //+ Date.now();
        cb(null, fileName + fileExt);
    }
});

const UPLOAD_FOLDER = `${__dirname}/Uploads/UserPhoto`

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3000000, // 1MB

    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, png ,jpg formate allowed!'));
        }
    }
})

// post method
router.post('/registration', upload.single('file'), (req, res) => {
    console.log(req.file);
    const newReg = new user({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        create: req.body.create,
        img: req.file.filename,
    });
    newReg.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "user sing up was inserted successfully!"
            })
        }
    })
})

// user get all data
router.get('/allUser', (req, res) => {
    user.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json(data)
        }
    })
})

//get delete method

router.delete('/classDelete/:id', (req, res) => {
    user.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            })
        } else {
            res.status(200).json({
                message: "Delete successfully!"
            })
        }
    })
})




module.exports = router