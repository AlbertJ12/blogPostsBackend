import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import blogRoutes from './routes/blog.route.js';
import categoryRoutes from './routes/category.route.js';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.use('/posts', blogRoutes);
app.use('/categories', categoryRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});