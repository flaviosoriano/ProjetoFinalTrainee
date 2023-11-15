import prisma from '../../../../config/client';
import {User} from '@prisma/client';
import MusicService from '../../Music/Services/MusicService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import bcrypt from 'bcrypt';
import isEmailValid from '../../../../utils/constants/isEmailValid';
import isURLValid from '../../../../utils/constants/isURLValid';
import Role from '../../../../utils/constants/Role';

class UserService{

	async encryptPassword(password:string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	async createUser(body:User) {
		const user = await prisma.user.findFirst({where:{email:body.email}});
		// Query Errors:
		if (user != null){
			throw new QueryError('Email is already in use.');
		} else if (body.name == null || body.name.trim()=='') {
			throw new QueryError('You did not define a name.');
		} else if (body.password == null) {
			throw new QueryError('You did not define a password.');
		} else if (body.role == null ) {
			throw new QueryError('You did not define a role.');
		// Param Errors:
		} else if (isEmailValid(body.email)==false) {
			throw new InvalidParamError('Your email is not valid.');
		} else if (body.photo!=null && isURLValid(body.photo)==false) {
			throw new InvalidParamError('Your photo url is not valid.');
		} else if (body.role!=Role.USER && body.role!=null) {
			throw new InvalidParamError('Your role must be USER.');
		// No errors:
		} else {
			const user = { 
				name: body.name,
				email: body.email,
				password: body.password,
				photo: body.photo,
				role: Role.USER
			};
			user.password = await this.encryptPassword(user.password);
			await prisma.user.create({
				data: user
			});
			return(user);
		}
	}

	async updateUser(id:number, body:User){
		const user = await this.getUserbyId(id);
		const user_sameEmail = await prisma.user.findFirst({
			where:{
				email: body.email
			},
		});
		// Query Errors:
		if (user == null) {
			throw new QueryError('Given id is not assigned to any user.');
		} else if (user.id != body.id && body.id != null) {
			throw new QueryError('You can not change an ID.');
		} else if (user.name == body.name && user.password == body.password && user.role == body.role && user.photo == body.photo && user.photo) {
			throw new QueryError('You did not insert any data to update.');
		} else if (body.email!=null && body.email!='' && user_sameEmail!=null && user.email!=body.email) {
			throw new QueryError('Email is already in use.');
		// Param Errors:
		} else if (body.email!=null && isEmailValid(body.email)==false) {
			throw new InvalidParamError('Your email is not valid.');
		} else if (body.photo!=null && isURLValid(body.photo)==false) {
			throw new InvalidParamError('Your photo url is not valid.');
		} else if (body.role!=null && body.role!=Role.USER) {
			throw new InvalidParamError('Your role must be USER.');
		// No errors:
		} else {
			if (body.password != null) {
				body.password = await this.encryptPassword(body.password);
			}
			await prisma.user.update({
				data: {
					email: body.email,
					name: body.name,
					password: body.password,
					photo: body.photo,
					role: Role.USER
				},
				where: {
					id: id
				}
			});
		}
	}

	async getUsers(){
		const user = await prisma.user.findMany();
		return user;
	}

	async getUserbyemail(wantedemail: string){
		if (!wantedemail) {
			throw new QueryError('You need to insert an email.');
		}
		const user = await prisma.user.findFirst({
			where:{
				email: wantedemail
			},
		});
		if (isEmailValid(wantedemail)==false) {
			throw new InvalidParamError('This email is not valid.');
		} else if (!user) {
			throw new QueryError('This email is not assigned to any user.');
		} else {
			return user;
		}
	}

	async getUserbyId(wantedId: number){
		if (!wantedId) {
			throw new QueryError('You need to insert an id.');
		}
		const user = await prisma.user.findFirst({
			where:{
				id: wantedId
			},
		});
		if (user==null) {
			throw new QueryError('This id is not assigned to any user.');
		} else {
			return user;
		}
	}

	async deleteUser(wantedemail: string){
		const user = await prisma.user.delete({
			where:{
				email: wantedemail
			}
		});
		if (isEmailValid(wantedemail)==false) {
			throw new InvalidParamError('This email is not valid.');
		} else if (user==null) {
			throw new QueryError('This email is not assigned to any user.');
		} else {
			return user;
		}
	}

	async AddMusic(Userid: number, music_name: string){
		const user = await this.getUserbyId(Userid);
		if (user == null) {
			throw new QueryError('This id is not assigned to any user');
		}
		const music = await MusicService.getMusicbyName(music_name);
		if (music == null) {
			throw new QueryError('This music does not exist.');
		}
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