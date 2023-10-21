import dotenv from 'dotenv';
import express, {Express} from 'express';
import cors, {CorsOptions} from 'cors';
import UserRouter from '../source/dominios/User/controllers/UserIndex';

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('/api/users', UserRouter);
app.use('/api/artists', ArtistRouter);
//aqui ficarão os app.user de cada model assim que as rotas forem criadas

export default app;