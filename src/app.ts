import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import { connectToDatabase } from './database';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

const PORT = process.env.PORT ?? 3000;

const app = express();

/* Conectando com o banco de dados */
connectToDatabase();

/* Definindo template engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(logger('dev'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, `data:`],
        scriptSrc: [`'self'`, `'unsafe-eval'`, `'unsafe-inline'`],
      },
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());

/* Rotas */
app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

/* Iniciando o servidor */
app.listen(PORT, () => {
  console.log(`SERVER RUNNING => http://localhost:${PORT}`);
});
