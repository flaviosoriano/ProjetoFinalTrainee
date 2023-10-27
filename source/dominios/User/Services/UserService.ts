import prisma from '../../../../config/client';
import {User} from '@prisma/client';
import MusicController from '../../Music/Controllers/MusicController';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import bcrypt from 'bcrypt';

class UserService{

	async encryptPassword(passaword:string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(passaword, salt);
		return(hash);
	}

	async createUser(body:User) {
		const exist = await this.getUserbyemail(body.email);
		if(exist != null){
			throw new QueryError('Error: email is already used');
		}
		else{
			const user = {
				
				name: body.name,
				email: body.email,
				password: body.password,
				photo: body.photo,
				role: body.role
				
			};
			user.password = await this.encryptPassword(user.password);
			await prisma.user.create({
				data: user
			});
			return(user);
		}
	}

	async updateUser(id:number, body:User){
		const resultado = this.getUserbyId(id);
		if (resultado == null) {
			throw new QueryError('Error: given Id is not assigned to any user');
		}
		if (body.password != null) {
			body.password = await this.encryptPassword(body.password);
		}
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
			throw new InvalidParamError('Error: given email is not assigned to any user');
		}
		else{
			return deleteduser;
		}
	}

	async AddMusic(Userid: number, music_name: string){
		const user = await this.getUserbyId(Userid);
		if (user == null) {
			throw new InvalidParamError('Error: given Id is not assigned to any user');
		}
		const music = await MusicController.getMusicbyName(music_name);
		await prisma.user.update({
			data: {
				listend_musics:{
					connect: {
						id: music?.id
					},
				},
			},
			where: {
				id: Userid,
			},
			include:{
				listend_musics: true
			},
		});
	}
}

export default new UserService;