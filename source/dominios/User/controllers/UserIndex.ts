import UserController from './UserController';
import { Router, Request, Response, NextFunction } from 'express';

const UserRouter = Router();

UserRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await UserController.CreateUser(req.body);
		res.json('User created successfully');
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get',async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserController.getusers();
		res.json(users);
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

UserRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		await UserController.UpdateUser(id, req.body);
		res.json('User updated successfully');
	} catch (error) {
		next(error);
	}
});

UserRouter.delete('/delete/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await UserController.Deleteuser(req.params.email);
		res.json('User deleted successfully');
	} catch (error) {
		next(error);
	}
});

export default UserRouter;