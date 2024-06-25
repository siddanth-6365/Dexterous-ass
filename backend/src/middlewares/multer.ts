import multer from "multer";
import { s3 } from "../utilis/amazon-s3";
import multerS3 from "multer-s3";

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "siddanth-firstbucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req: any, file: Express.Multer.File, cb: (error: any, key?: string) => void) => {
      const finalImgName = `${Date.now()}-${file.originalname}`;
      (req as any).body.finalImgName = finalImgName;
      cb(null, finalImgName);
    },
  }),
});