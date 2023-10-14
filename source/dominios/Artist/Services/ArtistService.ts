import prisma from '../../../../client/client';
import {Artist} from '@prisma/client';

class ArtistService {

	async create(body:Artist) {
		await prisma.artist.create({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: body.num_streams
			}
		});
	}

	async getArtistById(wantedId: number) {
		const Artist = await prisma.artist.findFirst({
			where: {
				id: wantedId
			}
		});
		return Artist;
	}

	async getArtists() {
		const Artist = await prisma.artist.findMany();
		return Artist;
	}

	async update(wantedId: number, body: Artist) {
		await prisma.artist.update({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: body.num_streams
			},
			where: {
				id: wantedId
			}
		});
	}

	async delete (wantedId: number) {
		await prisma.artist.delete({
			where: {
				id: wantedId
			}
		});
	}

}

export default new ArtistService;