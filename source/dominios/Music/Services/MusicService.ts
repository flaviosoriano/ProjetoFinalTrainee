import prisma from '../../../../client/client';
import {Music} from '@prisma/client';
import {Artist} from '@prisma/client';

class MusicService {

	async create (body:Music) {
		await prisma.music.create({
			data: {
				name: body.name,
				genre: body.genre,
				album: body.album,
				artistId: body.artistId
			}
		});
	}

}

export default new MusicService;