import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { connectToDatabase } from './database/db';

const PORT = process.env.PORT ?? 3000;

const app = express();

/* Definindo template engine */
app.set('views', './views');
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
app.use(express.static('../public'));
app.use(compression());

/* Conectando com o banco de dados */
connectToDatabase();

/* Iniciando o servidor */
app.listen(PORT, () => {
  console.log(`SERVER RUNNING => http://localhost:${PORT}`);
});
