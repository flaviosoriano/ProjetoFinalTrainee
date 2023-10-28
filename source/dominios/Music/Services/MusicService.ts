/* eslint-disable indent */
import prisma from '../../../../config/client';
import {Music} from '@prisma/client';
import ArtistService from '../../Artist/Services/ArtistService';
import { QueryError } from '../../../../errors/QueryError';
import { InvalidParamError } from '../../../../errors/InvalidParamError';

class MusicService {

	async create (body:Music) {
		const artist = await ArtistService.getArtistById(body.id);
		if (!body.name || body.name.trim()=='') {
			throw new QueryError('You did not define a name.');
		} else if (!body.genre || body.genre.trim()=='') {
			throw new QueryError('You did not define a genre.');
		} else if (!body.album || body.album.trim()=='') {
			throw new QueryError('You did not define a album.');
		} else if (!artist) {
			throw new QueryError('Artist id does not exist.');
		} else {
			await prisma.music.create({
				data: {
					name: body.name,
					genre: body.genre,
					album: body.album,
					artistId: Number(body.artistId)
				}
			});
		}
	}

	async getMusicbyName(WantedName: string){
		const music = await prisma.music.findFirst({
			where:{
				name: WantedName
			},
		});
		if (music == null) {
			throw new InvalidParamError('This music does not exist.');
		} else {
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
			throw new QueryError('Music id does not exist.');
		} else {
			return Music;
		}
	}

	async getMusicbyArtist (wantedArtistId: number) {
		const Artist = await ArtistService.getArtistById(wantedArtistId);
		if (!Artist) {
			throw new QueryError('Artist does not exist');
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
			throw new QueryError('Album does not exist');
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
			throw new QueryError('Genre does not exist');
		} else {
			return Music;
		}	
	}

	async getMusics () {
		const Music = await prisma.music.findMany();
		if (Music == null) {
			throw new QueryError('No music found.');
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
		const artist = await ArtistService.getArtistById(wantedId);
		if (!Music) {
			throw new QueryError('Music id does not exist.');
		} else if (!artist) {
			throw new QueryError('Artist id does not exist.');
		} else if (Music.id != body.id && body.id != null) {
			throw new QueryError('You can not change an ID.');
		} else if (body.album==Music.album && body.artistId==Music.artistId && body.genre==Music.genre && body.name==Music.name) {
			throw new QueryError('You did not insert any data to update.');
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
			throw new QueryError('This music does not exist.');
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