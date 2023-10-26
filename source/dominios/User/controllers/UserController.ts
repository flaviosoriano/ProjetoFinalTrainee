import { User } from '@prisma/client';
import UserService from '../Services/UserService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';

class UserController{
     
	async CreateUser(body: User) {
		try {
			await UserService.createUser(body);
			return ('User created sucessfully');
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}

	async UpdateUser(id:number, body:User){
		try {
			await UserService.updateUser(id, body);
		} catch (error) {
			if (error instanceof InvalidParamError) {
				console.log(error.message);
			}
		}
	}

	async AddMusic(id: number, music_name: string){
		try {
			await UserService.AddMusic(id, music_name);
		} catch (error) {
			if (error instanceof InvalidParamError) {
				console.log(error.message);
			}
		}
	}

	async getUserbyEmail(wantedEmail: string){
		try {
			const user = await UserService.getUserbyemail(wantedEmail);
			return user;
		} catch (error) {
			if (error instanceof InvalidParamError) {
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
			if (error instanceof InvalidParamError) {
				console.log(error.message);
			}
		}
	}
}

export default new UserController;