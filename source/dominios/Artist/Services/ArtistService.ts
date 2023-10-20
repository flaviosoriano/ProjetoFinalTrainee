import prisma from '../../../../config/client';
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
		try {
			const Artist = await prisma.artist.findFirst({
				where: {
					id: wantedId
				}
			});
			return Artist;
		} catch (error) {
			console.log('Error: artist id does not exist');
		}
	}

	async getArtists() {
		
		const Artist = await prisma.artist.findMany();
		return Artist;
	}

	async update(wantedId: number, body: Artist) {
		try {
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
		} catch (error) {
			console.log('Error: artist id does not exist');
		}
	}

	async delete (wantedId: number) {
		try {
			await prisma.artist.delete({
				where: {
					id: wantedId
				}
			});
		} catch (error) {
			console.log('Error: artist id does not exist');
		}
	}

}

export default new ArtistService;