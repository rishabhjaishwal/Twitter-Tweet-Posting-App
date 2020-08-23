const bcrypt = require('bcryptjs');
const userModel = require('../models/User');
const { CustomError } = require('../helpers/error');
const { createToken } = require('../helpers/utility');

const userService = {
  /**
  * @name signUp
  * @author Rishabh Jaishwal
  * @description Used for DB Insert Operation
  * @param payload {*} contain signup payload
  */
  signUp: async (payload) => userModel.create(payload),
  /**
  * @name login
  * @author Rishabh Jaishwal
  * @description Used for fetch user from DB and create authentication token
  * @param payload {*} contain signup payload
   */
  login: async (payload) => {
    const isFound = await userModel.findOne({ email: payload.email, activeStatus: true });
    if (isFound) {
      const match = await bcrypt.compare(payload.password, isFound.password);
      if (match) {
        const token = createToken(match);
        // eslint-disable-next-line no-underscore-dangle
        return { token, user: { name: isFound.name, userId: isFound._id } };
      }
      throw new CustomError(400, 'Password not match');
    } else {
      throw new CustomError(400, 'Email Id not Found');
    }
  },
};

module.exports = userService;
