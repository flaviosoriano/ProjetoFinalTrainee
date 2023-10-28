import prisma from '../../../../config/client';
import {Artist} from '@prisma/client';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import isURLValid from '../../../../utils/constants/isURLValid';

class ArtistService {

	async create(body:Artist) {
		if (body.name == null || body.name.trim()=='') {
			throw new QueryError('You did not define a name.');
		} else if(body.photo!=null && isURLValid(body.photo)==false) {
			throw new InvalidParamError('Your photo url is not valid.');
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
			throw new QueryError('Error: no artist found.');
		} else {
			return Artist;
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
		} else if(body.photo!=null && isURLValid(body.photo)==false) {
			throw new InvalidParamError('Your photo url is not valid.');
		// No Errors:
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

	/*async getallArtistsMusics(){
		const artist = await prisma.artist.findMany({
			include: {
				musics: true
			},
		});
		if (artist == null) {
			throw new InvalidParamError('Error: Artist Id does not exist');
		} else {
			return artist;
		}	
	}*/

}

export default new ArtistService;