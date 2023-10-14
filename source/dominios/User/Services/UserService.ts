import prisma from '../../../../client/client';
import {user} from '@prisma/client';

class UserService{
	async user(body:user) {
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

	async updateUser(body:user){
		const user = await prisma.user.update({
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