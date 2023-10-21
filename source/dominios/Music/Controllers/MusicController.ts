import { ParametroInvalido } from '../../../../errors/errors';
import {Music} from '@prisma/client';
import {Artist} from '@prisma/client';
import MusicService from '../Services/MusicService';


class MusicController{
	async create (body:Music) {
		try {
			await MusicService.create(body);
			console.log('Artist created sucessfully');
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getMusicbyid (wantedId: number){
		try {
			const music = await MusicService.getMusicbyid(wantedId);
			return music;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getMusicbyArtist (wantedArtist: Artist){
		try {
			const music = MusicService.getMusicbyArtist(wantedArtist);
			return music;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	async getMusicbyAlbum (wantedAlbum: string){
		try {
			const music = await MusicService.getMusicbyAlbum(wantedAlbum);
			return music;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getMusicbyGenre (wantedGenre: string){
		try {
			const music = await MusicService.getMusicbyGenre(wantedGenre);
			return music;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getMusics (){
		try {
			const music = await MusicService.getMusics();
			return music;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async update(wantedId: number, body: Music){
		try {
			await MusicService.update(wantedId,body);
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}
    
	async delete (wantedId: number){
		try {
			await MusicService.delete(wantedId);
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}
}

export default new MusicController;