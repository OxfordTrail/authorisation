//Validation
const Joi = require('@hapi/joi');

const registrationValidation = (data) =>{
    const schema = {
        name: Joi.string()
                 .min(6)
                 .required(),
        email: Joi.string()
                  .email()
                  .min(6)
                  .required(),
        password: Joi.string()
                     .min(6)
                     .required()
        
    };

    return Joi.validate(data, schema);
} 

const loginValidation = (data) =>{
    const schema = {
        email: Joi.string()
                  .email()
                  .min(6)
                  .required(),
        password: Joi.string()
                     .min(6)
                     .required()
        
    };

    return Joi.validate(data, schema);
} 

exports.registrationValidation = registrationValidation;
exports.loginValidation = loginValidation;
