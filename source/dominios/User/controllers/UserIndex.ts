import UserController from './UserController';
import { Router, Request, Response, NextFunction } from 'express';

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
		await UserController.CreateUser(req.body);
		res.json('Usuário criado com sucesso!');
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserController.getUserbyEmail(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});
export default UserRouter;