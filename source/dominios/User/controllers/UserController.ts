import { User } from '@prisma/client';
import UserService from '../Services/UserService';
import { ParametroInvalido } from '../../../../errors/errors';

class UserController{
     
	async CreateUser(body: User) {
		try {
			await UserService.createUser(body);
			console.log('User created sucessfully');
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async UpdateUser(body:User){
		try {
			await UserService.updateUser(body);
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getUserbyEmail(wantedEmail: string){
		try {
			const user = await UserService.getUserbyemail(wantedEmail);
			return user;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getusers(){
		try {
			const user = UserService.getUsers();
			return user;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	async Deleteuser(wantedEmail: string){
		try {
			await UserService.deleteUser(wantedEmail);
			
		}catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}
}

export default new UserController;