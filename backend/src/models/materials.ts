import { Schema, model, Document } from 'mongoose';

interface IMaterial extends Document {
  name: string;
  technology: string;
  colors: string[];
  pricePerGram: number;
  imageUrl: string;
}

const MaterialSchema = new Schema<IMaterial>({
  name: { type: String, required: true },
  technology: { type: String, required: true },
  colors: { type: [String], required: true },
  pricePerGram: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

const Material = model<IMaterial>('Material', MaterialSchema);

export default Material;
