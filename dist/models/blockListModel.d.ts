import { Document, Model } from 'mongoose';
export interface IBlocklist extends Document {
    ip: string;
    email: string;
    createdAt: Date;
}
declare const Blocklist: Model<IBlocklist>;
export default Blocklist;
