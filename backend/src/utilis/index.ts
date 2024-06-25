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

export async function getmaterialsWithUrls(materials: any[]) {

  const promises = materials.map(async (material) => {
    const imageUrl = material.imageUrl;
    const signedUrlPromise = await getSignedImgUrl(imageUrl);
    material.imageUrl = signedUrlPromise || "";

    return material;
  });

  const materialsWithUrls = await Promise.allSettled(promises);

  const materialsData = materialsWithUrls.map((result: any) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      console.error(
        "Error generating signed URL for material:",
        result.value._id
      );
      return result.value;
    }
  });

  return materialsData;

}
