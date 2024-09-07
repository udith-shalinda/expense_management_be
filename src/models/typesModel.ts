import { Schema, model, Types } from 'mongoose';

export interface IType extends Document {
  _id: string;
  name: string;
}

const typeSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Type = model<IType>('Type', typeSchema);

export default Type;
