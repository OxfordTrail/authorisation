const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {registrationValidation, loginValidation} = require('./validation');


router.post('/register', async(req, res)=>{
    //Validate the data before creating a record
    const {error} = registrationValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Checking if the user is already in the databases
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash password
     const salt  = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.send({user: saveUser._id});
    } catch (error) {
        res.send(error);
    }
});

router.post('/login', async(req, res) =>{
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);        
    }

    //Check if user exists
    const user = await User.findOne({
        email: req.body.email
    }); 
    if (!user) {
        return res.send('Email not found').sendStatus(400);
    }
    //PASSWORD is Correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.send('Password is wrong').sendStatus(400);
    }
    //Create and assign a token

    const token = jwt.sign({_id: user._id},  process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});



module.exports = router;