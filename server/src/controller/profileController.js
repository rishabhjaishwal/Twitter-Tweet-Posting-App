const cloudinary = require('cloudinary').v2;
const config = require('../config');
const { bufferToStream, shareProfile } = require('../helpers/utility');
const { CustomError } = require('../helpers/error');
const profileService = require('../services/profileService');

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
});

const profileController = {
  create: async (req, res, next) => {
    try {
      if (req.file) {
        const nameArray = req.file.originalname.split('.');

        // clodinary stream api
        const stream = cloudinary.uploader.upload_stream(
          { format: nameArray[nameArray.length - 1] },
          async (error, result) => {
            try {
              if (error) {
                throw new CustomError(400, 'Error occured while uploading');
              } else {
                const isCreated = await profileService.createProfile(req.body, result.secure_url);
                if (isCreated) {
                  //  After Inserting into DB profile shared to twitter
                  shareProfile(isCreated);
                  res.json({
                    success: true,
                    message: 'Successfully profile created',
                    data: isCreated,
                  });
                } else {
                  res.json({
                    success: false,
                    message: 'some error occured while creating',
                  });
                }
              }
            } catch (errs) {
              next(errs);
            }
          },
        );
        // Converting buffer to stream and piping to cloudinary upload url
        bufferToStream(req.file.buffer).pipe(stream);
      } else {
        throw new CustomError(400, 'Profile should be uploaded');
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = profileController;
