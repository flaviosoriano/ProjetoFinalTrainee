import prisma from '../../../../client/client';
import {Artist} from '@prisma/client';

class ArtistService {

	async create(body:Artist) {
		const Artist = await prisma.user.create({
			data: {
				name: body.name,
				photo: body.photo,
				num_streams: body.num_streams
			}
		});
		return Artist;
	}

}

export default new ArtistService;