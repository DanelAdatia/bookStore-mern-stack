import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoutes.js';
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors({
  origin:'http://localhost:5173',
  methods:['GET', 'POST','PUT', 'DELETE'],
  allowedHeaders:['Content-Type']
}))

app.use('/books', bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('mongoDB connected');
    app.listen(PORT, () => {
      console.log(`listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
