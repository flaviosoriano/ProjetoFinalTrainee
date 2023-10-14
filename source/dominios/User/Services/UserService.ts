import prisma from '../../../../client/client';
import {User} from '@prisma/client';

class UserService{
	async User(body:User) {
		const usuario = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: body.password,
				photo: body.photo,
				role: body.role
			}
		})
	}

	async updateUser(body:User){
		const User = await prisma.user.update({
			data: {
				email: body.email,
				name: body.name,
				password: body.password,
				photo: body.photo
			},
			where: {
				id: body.id
			}
		})
	}
}

export default new UserService;