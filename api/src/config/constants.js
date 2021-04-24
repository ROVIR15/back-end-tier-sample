import dotenv from 'dotenv';

dotenv.config();

const WHITELIST = {
  users: {
    create: ['email', 'username', 'password'],
  }
};


const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$'
};

export default testConfig;