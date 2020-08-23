const jwt = require('jsonwebtoken');
const { CustomError } = require('../helpers/error');
const config = require('../config');

/**
 * @name authenticateUser
 * @author Rishabh jaishwal
 * @description Middleware for authenticating user for Specific API/Application
 * @param {*} req Client Request
 * @param {*} res Response
 * @param {*} next callback
 */
function authenticateUser(req, res, next) {
  try {
    if (!req.header('authorization')) {
      throw new CustomError(400, 'Authentication token must be provided');
    }
    // Splitting Bearer Token to get jwt token
    const token = req.header('authorization').split(' ')[1];
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new CustomError(401, 'UnAuthorized Access');
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = authenticateUser;
