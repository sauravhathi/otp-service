import mongoose, { Schema, Document, Model } from 'mongoose';

const expiryTime = parseInt(process.env.OTP_VALIDITY_PERIOD_MINUTES || '5') + 1;

export interface IOtp extends Document {
  id: string;
  email: string;
  otp: string;
  attempts: number;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    attempts: { type: Number, default: 0 }
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: expiryTime * 60 });

const Otp: Model<IOtp> = mongoose.model<IOtp>('Otp', otpSchema);

export default Otp;