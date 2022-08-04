const express = require('express');
const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.use(express.json());

router.post('/reg', (req, res) => {
    const { emailid, password, name } = req.body;
    UserModel.findOne({ emailid: emailid }, async (err, user) => {
        try {
            if (user) {
                return res.status(409).send({ message: 'User already exits!!' });
            }
            else {
                const user1 = new UserModel({
                    name, emailid, password
                });
                const data = await user1.save()
                if (data) {
                    res.status(200).send({  message: 'User Registered!!' });
                }
                else {
                    res.send(err)
                }
            }
        } catch (error) {
            throw error
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email : email }, async (err, user) => {
        console.log(user)
        try {
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (isMatch) {
                    const token = jwt.sign({
                        email: user.email,
                        _id: user._id.toString()
                    }, process.env.SECRET_KEY, { expiresIn: '24h' });
                    res.status(200).send({ token: token, data: "Login sucessfull!!" });
                }
                else {
                    res.status(401).send({ code: 'INVALID_PASSWORD', message: "Wrong Password" })
                }
            }
            else {
                res.status(404).send({messsage: "Wrong Credentials!!" });
            }
        } catch (error) {
            throw error
        }
    });
});

module.exports = router;