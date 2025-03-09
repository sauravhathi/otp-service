import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import otpRoutes from './routes/otpRoutes';
import logger from './utils/logger';
import { validateEmail } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Welcome to OTP service');
});

app.use('/api', validateEmail, otpRoutes);

async function startServer(): Promise<void> {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
  }
}

startServer();