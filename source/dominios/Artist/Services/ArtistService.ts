import prisma from '../../../../config/client';
import {Artist} from '@prisma/client';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';

class ArtistService {

	async create(body:Artist) {
		if (body.name == null || body.name.trim()=='') {
			throw new QueryError('You did not define a name.');
		} else {
			const artist = await prisma.artist.create({
				data: {
					name: body.name,
					photo: body.photo,
					num_streams: Number(body.num_streams)
				}
			});
			return(artist);
		}
	}

	async getArtistById(wantedId: number) {
		const Artist = await prisma.artist.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Artist == null) {
			throw new QueryError('Artist Id does not exist');
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
		// Query Errors:
		if (Artist == null) {
			throw new QueryError('Artist Id does not exist.');
		} if (body.id != Artist.id && body.id != null) {
			throw new QueryError('You can not change an ID. Keep it null or empty.');
		} else if ((body.name == null || body.name.trim()=='') && body.num_streams==null && body.photo==null) {
			throw new QueryError('You did not insert any data to update.');
		} else if (body.name==Artist.name && body.num_streams==Artist.num_streams && body.photo==Artist.photo) {
			throw new QueryError('No changes detected. Artist data remains unchanged');
		// Param Errors:
		} else {
			await prisma.artist.update({
				data: {
					name: body.name,
					photo: body.photo,
					num_streams: Number(body.num_streams)
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
			throw new QueryError('Artist Id does not exist.');
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