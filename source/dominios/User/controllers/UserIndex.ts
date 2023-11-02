import UserService from '../Services/UserService';
import { Router, Request, Response, NextFunction, response } from 'express';
import statusCodes from '../../../../utils/constants/statusCodes';
import { LoginMid, verifyJWT, NotLoggedin } from '../../../middlewares/authentication';
//import CheckRole from '../../../middlewares/checkRole';

const UserRouter = Router();

UserRouter.post('/login', NotLoggedin, LoginMid);

UserRouter.post('/logout', verifyJWT, 
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.clearCookie('jwt');
			res.status(statusCodes.SUCCESS).json(response);
		} catch (error) {
			next(error);
		}
	});

UserRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await UserService.createUser(req.body);
		res.status(statusCodes.CREATED).json(response);
	} catch (error) {
		next(error);
	}
});

UserRouter.get('/get', verifyJWT, 
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await UserService.getUsers();
			res.status(statusCodes.SUCCESS).json(users);
		} catch (error) {
			next(error);
		}
	});

UserRouter.get('/get/email/:email', verifyJWT, 
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UserService.getUserbyemail(req.params.email);
			res.status(statusCodes.SUCCESS).json(user);
		} catch (error) {
			next(error);
		}
	});

UserRouter.get('/get/id/:id', verifyJWT, 
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UserService.getUserbyId(Number(req.params.id));
			res.status(statusCodes.SUCCESS).json(user);
		} catch (error) {
			next(error);
		}
	});

UserRouter.put('/update/:id', verifyJWT, 
	async (req: Request, res: Response, next: NextFunction) => {
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