import prisma from '../../../../client/client';
import {Artista} from '@prisma/client';

class ArtistaService {
	async create(body:Artista) {
		const Artista = await prisma.usuario.create({
			data: {
				nome: body.nome,
				foto: body.foto,
				num_streams: body.num_streams
			}
		});
		return Artista;
	}
}

export default new ArtistaService;