import prisma from '../../../../client/client';
import {Artist} from '@prisma/client';

class ArtistService {

	async create(body:Artist) {
		const Artist = await prisma.artist.create({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: body.num_streams
			}
		});
		return Artist;
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
		const Artist = await prisma.artist.update({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: body.num_streams
			},
			where: {
				id: wantedId
			}
		});
		return Artist;
	}

	async delete (wantedId: number) {
		const Artist = await prisma.artist.delete({
			where: {
				id: wantedId
			}
		});
		return Artist;
	}

}

export default new ArtistService;