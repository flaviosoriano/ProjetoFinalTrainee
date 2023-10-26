import {Artist} from '@prisma/client';
import ArtistService from '../Services/ArtistService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';

class ArtistController{

	async create(body: Artist) {
		try {
			await ArtistService.create(body);
			return('Artist created sucessfully');
		} catch (error) {
			if (error instanceof QueryError) {
				return(error.message);
			}
		}
	} //ok

	async getArtistbyId(wantedId: number){
		try {
			const artist = await ArtistService.getArtistById(wantedId);
			return artist;
		} catch (error) {
			if (error instanceof QueryError) {
				return(error.message);
			}
		}
	} //ok

	async getArtists(){
		try {
			const artists = ArtistService.getArtists();
			return artists;
		} catch (error) {
			if (error instanceof Error) {
				return(error.message);
			}
		}
	}//ok

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
			return('Artist updated sucessfully');
		} catch (error) {
			if (error instanceof QueryError) {
				return(error.message);
			}
		}
	} //erros funcionam, update nao funciona
    
	async delete (wantedId: number){
		try {
			await ArtistService.delete(wantedId);
			return('Artist deleted sucessfully');
		} catch (error) {
			if (error instanceof QueryError) {
				return(error.message);
			}
		}
	}//ok (menos o com relacao)

}

export default new ArtistController;