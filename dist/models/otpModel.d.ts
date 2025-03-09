import { Document, Model } from 'mongoose';
export interface IOtp extends Document {
    id: string;
    email: string;
    otp: string;
    attempts: number;
    createdAt: Date;
}
declare const Otp: Model<IOtp>;
export default Otp;
