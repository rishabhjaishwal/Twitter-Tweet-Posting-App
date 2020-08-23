const Joi = require('@hapi/joi');
const { CustomError } = require('../helpers/error');
const userService = require('../services/userService');

const userController = {
  /**
     * @name signUp
     * @author Rishabh Jaishwal
     * @description Used for getting client request for signup
     * @param {*} req client request
     * @param {*} res client response object which is going to be send
     * @param {*} next callback function
     */
  signUp: async (req, res, next) => {
    try {
      const { body } = req;
      const { error, value } = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).validate(body);
      if (error) {
        throw new CustomError(400, error.message);
      } else {
        const result = await userService.signUp(value);
        if (result) {
          res.json({
            success: true,
            message: 'Successfully signup done',
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: 'some error occured while creating',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { body } = req;
      const { error, value } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).validate(body);
      if (error) {
        throw new CustomError(400, error.message);
      } else {
        const result = await userService.login(value);
        if (result) {
          res.json({
            success: true,
            message: 'Successfully login done',
            data: result,
          });
        } else {
          res.json({
            success: false,
            message: 'some error occured while creating',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
