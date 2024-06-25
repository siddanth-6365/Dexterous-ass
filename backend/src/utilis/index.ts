import { s3 } from "./amazon-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {  GetObjectCommand } from "@aws-sdk/client-s3";

export async function getSignedImgUrl(objectKey: string) {
  const params = { Bucket: "siddanth-firstbucket", Key: objectKey };
  const command = new GetObjectCommand(params);

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (err) {
    console.error("Error generating signed URL:", err);
    return null;
  }
}
