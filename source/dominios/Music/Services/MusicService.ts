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
		try {
			const Music = await prisma.music.findUniqueOrThrow({
				where:{
					id: wantedId
				}
			});
			return Music;
			
		} catch (error) {
			console.log('Error: music id does not exist');
		}
	}

	async getMusicbyArtist (wantedArtist: Artist) {
		try {
			const Music = await prisma.music.findMany({
				where:{
					artist: wantedArtist
				}
			});
			return Music;
		} catch (error) {
			console.log('Error: artist does not exist');
		}
		
	}

	async getMusicbyAlbum (wantedAlbum: string) {
		try {
			const Music = await prisma.music.findMany({
				where:{
					album: wantedAlbum
				}
			});
			return Music;
		} catch (error) {
			console.log('Error: album does not exist');
		}
	}

	async getMusicbyGenre (wantedGenre: string) {
		try {
			const Music = await prisma.music.findMany({
				where:{
					genre: wantedGenre
				}
			});
			return Music;
		} catch (error) {
			console.log('Error: no music is assigned to the given genre');
		}
	}

	async getMusics () {
		try {
			const Music = await prisma.music.findMany();
			return Music;	
		} catch (error) {
			console.log('Error: no music registered yet');
		}

	}

	async update(wantedId: number, body: Music) {
		try {
			await prisma.music.update({
				data: {
					name: body.name,
					genre: body.genre,
					album: body.album,
					artistId: body.artistId
				},
				where: {
					id: wantedId
				}
			});
		} catch (error) {
			console.log('Error: music id does not exist');
		}
	}

	async delete (wantedId: number) {
		try {
			await prisma.music.delete({
				where:{
					id: wantedId
				}
			});
			
		} catch (error) {
			console.log('Error: music id does not exist');
		}
	}
}

export default new MusicService;