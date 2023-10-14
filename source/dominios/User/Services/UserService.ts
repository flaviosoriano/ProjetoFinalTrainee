import prisma from '../../../../client/client';
import {Usuario} from '@prisma/client';

class UserService{
	async criarUsuário(body:Usuario) {
		const usuario = await prisma.usuario.create({
			data: {
				nome: body.nome,
				email: body.email,
				senha: body.senha,
				foto: body.foto,
				cargo: body.cargo
			}
		})
	}
	
	async AtualizarUsuário(body:Usuario){
		const usuario = await prisma.usuario.update({
			data: {
				email: body.email,
				nome: body.nome,
				senha: body.senha,
				foto: body.foto
			},
			where: {
				id: body.id
			}
		})
	}
}

export default new UserService;