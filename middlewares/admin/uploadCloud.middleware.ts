import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
import { buffer } from 'stream/consumers';
dotenv.config();

//cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
//End cloudinary

const streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result = await streamUpload(buffer);
  return result['url'];
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }

  next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    for (const key in req["files"]) {
      req.body[key] = [];

      const array = req["files"][key];
      for (const item of array) {
        try {
          const result = await uploadToCloudinary(item.buffer);
          req.body[key].push(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  next();
};