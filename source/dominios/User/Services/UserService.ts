import prisma from '../../../../client/client';
import {User} from '@prisma/client';

class UserService{

	async createUser(body:User) {
		try {
			const user = await prisma.user.create({
				data: {
					name: body.name,
					email: body.email,
					password: body.password,
					photo: body.photo,
					role: body.role
				},
			});	
			return(user);
		} catch (error) {
			console.log('Error: email is already in use by another user');
		}
	}

	async updateUser(body:User){
		try {
			await prisma.user.update({
				data: {
					email: body.email,
					name: body.name,
					password: body.password,
					photo: body.photo,
					role: body.role
				},
				where: {
					id: body.id
				}
			});
		} catch (error) {
			console.log('Error: user id does not exist');
		}
	}

	async getUserbyemail(wantedemail: string){
		try { 
			const user = await prisma.user.findFirst({
				where:{
					email: wantedemail
				},
			});
			return user;
			
		} catch (error) {
			console.log('Error: no user found with the given email address');
		}
		
	}

	async getUsers(){
		const user = await prisma.user.findMany();
		return user;
	}

	async deleteUser(wantedemail: string){
		try {
			const deleteduser = await prisma.user.delete({
				where:{
					email: wantedemail
				}
			});
			return deleteduser;
		} catch (error) {
			console.log('Error: no user found with the given email address');
		}
	}
}

export default new UserService;