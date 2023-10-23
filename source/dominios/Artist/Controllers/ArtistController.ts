import { ParametroInvalido } from '../../../../errors/errors';
import {Artist} from '@prisma/client';
import ArtistService from '../Services/ArtistService';


class ArtistController{
	async create(body: Artist) {
		try {
			await ArtistService.create(body);
			console.log('Artist created sucessfully');
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getArtistbyId(wantedId: number){
		try {
			const artist = await ArtistService.getArtistById(wantedId);
			return artist;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async getArtists(){
		try {
			const artists = ArtistService.getArtists();
			return artists;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	async getArtistMusics(wantedId: number){
		try {
			const musics = ArtistService.getArtistMusics(wantedId);
			return musics;
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}

	async update(wantedId: number, body: Artist){
		try {
			await ArtistService.update(wantedId,body);
		} catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}
    
	async delete (wantedId: number){
		try {
			await ArtistService.delete(wantedId);
			
		}catch (error) {
			if (error instanceof ParametroInvalido) {
				console.log(error.message);
			}
		}
	}
}

export default new ArtistController;