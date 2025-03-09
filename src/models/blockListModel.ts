import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlocklist extends Document {
  ip: string;
  email: string;
  createdAt: Date;
}

const blocklistSchema: Schema<IBlocklist> = new Schema(
  {
    ip: { type: String, required: [true, 'IP address is required'], index: true },
    email: { type: String, required: [true, 'Email is required'], index: true },
    createdAt: { type: Date, default: Date.now }
  }
);

blocklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours

const Blocklist: Model<IBlocklist> = mongoose.model<IBlocklist>('Blocklist', blocklistSchema);

export default Blocklist;