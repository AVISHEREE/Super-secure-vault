import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/mongoose.connect.js';
import verifyToken from './middlewares/auth.middleware.js';
import userRouter from './routes/auth.route.js';
import vaultRouter from './routes/vault.route.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send("hi");
});

app.get('/a', verifyToken, (req, res) => {
  res.send("hi");
});

app.use('/user', userRouter);
app.use('/vault', vaultRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
