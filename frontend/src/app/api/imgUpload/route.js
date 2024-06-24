import { uploadImage } from "./cloudinary";

export async function POST(req, res) {
  const file = req.body.file; // Assuming file data is sent in the request body
  console.log(req)

  try {
    const url = await uploadImage(file);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
}
