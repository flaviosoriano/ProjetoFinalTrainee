import UserService from '../Services/UserService';
import { Router, Request, Response, NextFunction } from 'express';

const UserRouter = Router();

UserRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await UserService.createUser(req.body);
		res.json(response);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get',async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserService.getUsers();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.getUserbyemail(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

UserRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		await UserService.updateUser(id, req.body);
		res.json('User updated successfully');
	} catch (error) {
		next(error);
	}
});

UserRouter.delete('/delete/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await UserService.deleteUser(req.params.email);
		res.json('User deleted successfully');
	} catch (error) {
		next(error);
	}
});

export default UserRouter;