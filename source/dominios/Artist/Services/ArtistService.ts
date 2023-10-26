import prisma from '../../../../config/client';
import {Artist} from '@prisma/client';
import { InvalidParamError } from '../../../../errors/InvalidParamError';

class ArtistService {

	async create(body:Artist) {
		const artist = await prisma.artist.create({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: Number(body.num_streams)
			}
		});
		return(artist);
	}

	async getArtistById(wantedId: number) {
		const Artist = await prisma.artist.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Artist == null) {
			throw new InvalidParamError('Error: Artist Id does not exist');
		} else {
			return Artist;
		}	
	}

	async getArtists() {
		const Artist = await prisma.artist.findMany();
		if (Artist == null) {
			throw new InvalidParamError('Error: no artist found.');
		} else {
			return Artist;
		}
	}

	async getallArtistsMusics(){
		const artist1 = await prisma.artist.findMany({
			include: {
				musics: true
			},
		});
		if (artist1 == null) {
			throw new InvalidParamError('Error: Artist Id does not exist');
		} else {
			return artist1;
		}	
	}

	async update(wantedId: number, body: Artist) {
		const Artist = await prisma.artist.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Artist == null) {
			throw new InvalidParamError('Error: Artist Id does not exist');
		} else {
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
	}

	async delete (wantedId: number) {
		const Artist = await prisma.artist.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Artist == null) {
			throw new InvalidParamError('Error: Artist Id does not exist.');
		} else {
			await prisma.artist.delete({
				where: {
					id: wantedId
				}
			});
		}
	}

}

export default new ArtistService;