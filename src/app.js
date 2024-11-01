import { scopePerRequest } from 'awilix-express';
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../swagger.json' with { type: 'json' };
import { connectDB } from './config/database.js';
import container from './container.js';
import authMiddleware from './infra/middlewares/auth.middleware.js';
import authRoutes from './routes/auth.routes.js';
import farmRoutes from './routes/farm.routes.js';
import infoRoutes from './routes/info.routes.js';

configDotenv();

const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


await connectDB();

app.use(scopePerRequest(container));
app.use(authRoutes);
app.use(infoRoutes);
app.use(authMiddleware, farmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[app] > server runing on http://localhost:${PORT}`);
});
