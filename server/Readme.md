# Twitter profile Posting 📖

## Contents

- [How it works](#How-it-works-📚)
- [Main Dependencies](#Main-Dependencies-🖊)
- [Commands](#Commands)
- [Environment Variable](#Environment-Variable)
- [Developed By](#Developed-By)

## How it works 📚

It uses twitter npm module and cloudinary module for posting post on twitter and
cloudinary for uploading file. In this Example, I have created an API which take basic detail like **FirstName**, **LastName**, **Designation**, **Location**, **Image**. First Image get uploaded on cloudinary, then profile inserted into DB then profile published on twitter.

## Main Dependencies 🖊

- **multer** for file upload
- **cloudinary** for upload file on cloudinary
- **twitter** package for posting tweet
- **mongoose** for db connection
- **bcryptjs** for encrypt the password

## Commands

### Docker Command

```sh
docker-compose up --build
```

### Node Script

#### For Dev Server

```sh
npm run dev
```

#### For Prod Server

```sh
npm run prod
```

## Environment Variable

```env
    // Used for creating Mongo Connection URL with or without AUTH
    MONGO_AUTH=1   [value = 0/1]
    MONGO_USERNAME  [type = string]
    MONGO_PASSWORD  [type = string]
    MONGO_HOSTNAME  [type = string]
    MONGO_PORT      [type = string]
    MONGO_DB        [type = string]

    // cloudinary dev variable
    CLOUD_NAME [type = string]
    CLOUD_KEY [type = string]
    CLOUD_SECRET [type = string]

    // twitter dev variable
    CONSUMER_KEY [type = string]
    CONSUMER_SECRET [type = string]
    TWEET_TOKEN_KEY [type = string]
    TWEET_TOKEN_SECRET [type = string]

    // jwt variable
    JWT_SECRET [type = string]

    // bcrypt variable
    BCRYPT_ROUND [type = integer] Recommend to set 10


    // Note: These variable need to be put inside the .env file
    // Note: If mongo auth used then set MONGO_AUTH=1 otherwise if set MONGO_AUTH=0
    // Note: Based on MONGO_AUTH mongo connection URL generated
```

## Developed By

#### **Name**: Rishabh Jaishwal

#### **email**: rishabhjaishwal7@gmail.com
