import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/postRoutes';
// import commentRoutes from './routes/commentRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
