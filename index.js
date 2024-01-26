import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './services/db.js';
import router from './routes/index.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}));

connectDB();

app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Running at http://localhost:${port}`);
});
