import prisma from '../../../../client/client';
import {User} from '@prisma/client';

class UserService{
	
	async createUser(body:User) {
		await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: body.password,
				photo: body.photo,
				role: body.role
			}
		});
	}

	async updateUser(body:User){
		await prisma.user.update({
			data: {
				email: body.email,
				name: body.name,
				password: body.password,
				photo: body.photo
			},
			where: {
				id: body.id
			}
		});
	}

	async getUserbyemail(wantedemail: string){
		const user = await prisma.user.findFirst({
			where:{
				email: wantedemail
			},
		});
		return user;
	}

	async getUsers(){
		const user = await prisma.user.findMany();
		return user;
	}

	async deleteUser(wantedemail: string){
		prisma.user.delete({
			where:{
				email: wantedemail
			}
		});
	}

}

export default new UserService;