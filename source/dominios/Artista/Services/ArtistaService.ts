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

	async listArtists() {
		const Artist = await prisma.artist.findMany();
		return Artist;
	}

	async updateArtist (body: Artist) {
		const Artist = await prisma.artist.update({
			data: {
				name: body.name,
				photo: body.photo
			},
			where: {
				id: body.id
			}
		});
		return Artist;
	}

	async deleteArtist (wantedId: number) {
		const Artist = await prisma.artist.delete({
			where: {
				id: wantedId
			}
		});
		return Artist;
	}

}

export default new ArtistService;