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

	async getMusicbyid (wantedId: number) {
		const Music = await prisma.music.findUniqueOrThrow({
			where:{
				id: wantedId
			}
		});
		return Music;
	}

	async getMusicbyArtist (wantedArtist: Artist) {
		const Music = await prisma.music.findMany({
			where:{
				artist: wantedArtist
			}
		});
		return Music;
	}

	async getMusicbyAlbum (wantedAlbum: string) {
		const Music = await prisma.music.findMany({
			where:{
				album: wantedAlbum
			}
		});
		return Music;
	}

	async getMusics () {
		const Music = await prisma.music.findMany();
		return Music;
	}

	async delete (wantedId: number) {
		prisma.music.delete({
			where:{
				id: wantedId
			}
		});
	}
}

export default new MusicService;