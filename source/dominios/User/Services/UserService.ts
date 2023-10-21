import prisma from '../../../../config/client';
import { ParametroInvalido } from '../../../../errors/errors';
import {User} from '@prisma/client';


class UserService{

	async createUser(body:User) {
		const exist = await this.getUserbyemail(body.email);
		if(exist != null){
			throw new ParametroInvalido('Error: email is already used');
		}
		else{
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
		}
	}

	async updateUser(id:number, body:User){
		const resultado = this.getUserbyId(id);
		if (resultado == null) {
			throw new ParametroInvalido('Error: given Id is not assigned to any user');
		}
		else{
			await prisma.user.update({
				data: {
					email: body.email,
					name: body.name,
					password: body.password,
					photo: body.photo,
					role: body.role
				},
				where: {
					id: id
				}
			});
		}
	}

	async getUserbyemail(wantedemail: string){
		const user = await prisma.user.findFirst({
			where:{
				email: wantedemail
			},
		});
		
		//throw new ParametroInvalido('Error: given email is not assigned to any user');
		return user;
		
	}

	async getUsers(){
		const user = await prisma.user.findMany();
		if (user == null) {
			throw new Error('No user found');
		}
		else{
			return user;
		}
	}

	async getUserbyId(wantedId: number){
		const user = await prisma.user.findFirst({
			where:{
				id: wantedId
			},
		});
		return user;
	}

	async deleteUser(wantedemail: string){
		const deleteduser = await prisma.user.delete({
			where:{
				email: wantedemail
			}
		});
		if (deleteduser == null) {
			throw new ParametroInvalido('Error: given email is not assigned to any user');
		}
		else{
			return deleteduser;
		}
	}
}

export default new UserService;