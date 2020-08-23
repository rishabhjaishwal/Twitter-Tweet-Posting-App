const Joi = require('@hapi/joi');
const profileModel = require('../models/profile');
const { CustomError } = require('../helpers/error');

const profileService = {

  /**
 * @name createProfile
 * @description Used for creating Db record for User
 * @param {*} body  Request body payload
 * @param {string} imageURL Uploaded Image URL
 * @returns {*} Inserted Record
 */
  createProfile: async (body, imageURL) => {
    const payload = JSON.parse(JSON.stringify(body));
    payload.profilePic = imageURL;
    const { error, value } = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      designation: Joi.string().required(),
      location: Joi.string().required(),
      profilePic: Joi.string().required(),
    }).validate(payload);
    if (error) {
      throw new CustomError(400, error.message);
    } else {
      return profileModel.create(value);
    }
  },
};

module.exports = profileService;
