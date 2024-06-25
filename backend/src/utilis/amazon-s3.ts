const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();

export const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1' 
});
