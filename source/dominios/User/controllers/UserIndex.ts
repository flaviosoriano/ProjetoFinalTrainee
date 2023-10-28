import UserService from '../Services/UserService';
import { Router, Request, Response, NextFunction } from 'express';
import statusCodes from '../../../../utils/constants/statusCodes';
import { LoginMid, verifyJWT } from '../../../middlewares/authentication';


const UserRouter = Router();

UserRouter.post('/login', LoginMid);

/*UserRouter.post('/logout', async (req: Request, res: Response, next: NextFunction) => {

});*/

UserRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await UserService.createUser(req.body);
		res.status(statusCodes.CREATED).json(response);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get',async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserService.getUsers();
		res.status(statusCodes.SUCCESS).json(users);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.getUserbyemail(req.params.email);
		res.status(statusCodes.SUCCESS).json(user);
	} catch (error) {
		next(error);
	}
});

UserRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		await UserService.updateUser(id, req.body);
		res.status(statusCodes.SUCCESS).json('User updated successfully.');
	} catch (error) {
		next(error);
	}
});

UserRouter.delete('/delete/:email', verifyJWT,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await UserService.deleteUser(req.params.email);
			res.status(statusCodes.SUCCESS).json('User deleted successfully');
		} catch (error) {
			next(error);
		}
});

export default UserRouter;