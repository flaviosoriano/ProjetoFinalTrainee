import {Artist} from '@prisma/client';
import ArtistService from '../Services/ArtistService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';

class ArtistController{

	async create(body: Artist) {
		try {
			await ArtistService.create(body);
			return('Artist created sucessfully');
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}

	async getArtistbyId(wantedId: number){
		try {
			const artist = await ArtistService.getArtistById(wantedId);
			return artist;
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}

	async getArtists(){
		try {
			const artists = ArtistService.getArtists();
			return artists;
		} catch (error) {
			if (error instanceof Error) {
				return(error.message);
			}
		}
	}

	async getallArtistsMusics(){
		try {
			const musics = ArtistService.getallArtistsMusics();
			return musics;
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}

	async update(wantedId: number, body: Artist){
		try {
			await ArtistService.update(wantedId,body);
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}
    
	async delete (wantedId: number){
		try {
			await ArtistService.delete(wantedId);
		} catch (error) {
			if (error instanceof InvalidParamError) {
				return(error.message);
			}
		}
	}

}

export default new ArtistController;