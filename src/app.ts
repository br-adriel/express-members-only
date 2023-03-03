import compression from 'compression';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import { connectToDatabase } from './database';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';
import passport from 'passport';
import {
  deserialize,
  localStrategy,
  serialize,
} from './config/passportjs.config';

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

/* Session */
const sessionStore = new MongoStore({
  collectionName: 'sessions',
  mongoUrl: process.env.DB_URL,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'SET A REAL SECRET',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // equals 12 hours
    },
  })
);

/* Configura Passport.js */
passport.use(localStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

app.use(passport.initialize());
app.use(passport.session());

/* Rotas */
app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

/* Iniciando o servidor */
app.listen(PORT, () => {
  console.log(`SERVER RUNNING => http://localhost:${PORT}`);
});
