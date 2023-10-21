import UserController from './UserController';
import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../Services/UserService';

const UserRouter = Router();

UserRouter.get('/',async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserController.getusers();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await UserService.createUser(req.body);
		res.json('Usuário criado com sucesso!');
	} catch (error) {
		next(error);
	}
});

export default UserRouter;