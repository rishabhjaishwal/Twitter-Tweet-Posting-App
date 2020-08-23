const jwt = require('jsonwebtoken');
const { Readable } = require('stream');
const Twitter = require('twitter');
const config = require('../config');
const { CustomError } = require('./error');

const client = new Twitter({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token_key: config.TWEET_TOKEN_KEY,
  access_token_secret: config.TWEET_TOKEN_SECRET,
});

const utility = {

  /**
 * @name createDbString
 * @description Used to return mongo dynamic connection URL
 * @param {string} DBName Name of DB used for connection
 * @param {boolean} auth used to get mongo string accordingly
 * @returns {string} mongo connection URL
 */
  createDbString: (DBName, auth) => {
    if (auth) {
      const mongoURL = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${DBName}?authSource=admin`;
      return mongoURL;
    }
    const mongoURL = `mongodb://${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${DBName}`;
    return mongoURL;
  },
  /**
 * @name createToken
 * @description It'll create new token at the time of login
 * > token expire time 60*5
 *
 * @param {*} user Data used to encrypt in jwt token
 * @param {*} refreshTime Time for token expire
 * @returns {string} returns token
 */
  createToken: (user, refreshTime = '24h') => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = { email: user.email, name: user.name, userId: user._id };
      const token = jwt.sign(data, config.JWT_SECRET, {
        expiresIn: refreshTime,
      });
      return token;
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  },
  /**
   * @name bufferToStream
   * @description Used to convert buffer to stream
   * @param buffer contain the buffer for file
   * @returns {*} stream
   */
  bufferToStream: (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  },
  /**
   * @name shareProfile
   * @description Used for share profile on Twitter
   * @param {*} profile User profile
   */
  shareProfile: (profile) => {
    const status = {
      status: `PROFILE\nName: ${profile.firstName} ${profile.lastName}\nDesignation: ${profile.designation}\nLocation: ${profile.location}\n\nImage: ${profile.profilePic}`,
    };
    client.post('statuses/update', status, (error, tweet, response) => {
      if (error) {
        throw new CustomError(400, error.message || error);
      } else {
        console.log('Successfully tweeted a profile!');
      }
    });
  },

};

module.exports = utility;
