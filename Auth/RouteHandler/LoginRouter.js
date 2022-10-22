const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const registrationSchema = require('../Schema/RegistrationSchema');
const user = new mongoose.model('user', registrationSchema)



// post login
router.post('/loggedIn', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await user.findOne({ email: email })
        if (userData.password === password) {
            res.status(200).json({
                data: userData,
                success: "loggedIn succesfull"
            })
        }
        else {
            res.status(500).json({
                passwordError: "password not match"
            })
        }
    } catch (error) {
        res.status(400).json({
            error: "invalid email"

        })
    }
})
module.exports = router