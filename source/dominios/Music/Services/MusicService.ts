import prisma from '../../../../config/client';
import {Music} from '@prisma/client';
import { ParametroInvalido } from '../../../../errors/errors';
import ArtistService from '../../Artist/Services/ArtistService';

class MusicService {

	async create (body:Music) {
		await prisma.music.create({
			data: {
				name: body.name,
				genre: body.genre,
				album: body.album,
				artistId: Number(body.artistId)
			}
		});
	}

	async getMusicbyName(WantedName: string){
		const music = await prisma.music.findFirst({
			where:{
				name: WantedName
			},
		});
		if (music == null) {
			throw new ParametroInvalido('Error: music does not exist');
		}
		else{
			return music;
		}
	}

	async getMusicbyid (wantedId: number) {
		const Music = await prisma.music.findUniqueOrThrow({
			where:{
				id: wantedId
			}
		});
		if (Music==null) {
			throw new ParametroInvalido('Error: music Id does not exist.');
		} else {
			return Music;
		}
	}

	async getMusicbyArtist (wantedArtistId: number) {
		const Artist = await ArtistService.getArtistById(wantedArtistId);
		if (Artist==null) {
			throw new ParametroInvalido('Error: artist does not exist');
		} else {
			const Music = await prisma.music.findMany({
				where:{
					artist: Artist
				}
			});
			return Music;
		}
	}

	async getMusicbyAlbum (wantedAlbum: string) {
		const Music = await prisma.music.findMany({
			where:{
				album: wantedAlbum
			}
		});
		if (Music == null) {
			throw new ParametroInvalido('Error: album does not exist');
		} else {
			return Music;
		}	
	}

	async getMusicbyGenre (wantedGenre: string) {
		const Music = await prisma.music.findMany({
			where:{
				genre: wantedGenre
			}
		});
		if (Music == null) {
			throw new ParametroInvalido('Error: genre does not exist');
		} else {
			return Music;
		}	
	}

	async getMusics () {
		const Music = await prisma.music.findMany();
		if (Music == null) {
			throw new ParametroInvalido('Error: no music found.');
		} else {
			return Music;
		}		
	}

	async update(wantedId: number, body: Music) {
		const Music = await prisma.music.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Music == null) {
			throw new ParametroInvalido('Error: music Id does not exist.');
		} else {
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
		}
	}

	async delete (wantedId: number) {
		const Music = await prisma.music.findFirst({
			where: {
				id: wantedId
			}
		});
		if (Music == null) {
			throw new ParametroInvalido('Error: music does not exist.');
		} else {
			await prisma.music.delete({
				where:{
					id: wantedId
				}
			});
		}
	}
}

export default new MusicService;