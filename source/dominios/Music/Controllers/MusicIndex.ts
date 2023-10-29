/* eslint-disable indent */
import MusicService from '../Services/MusicService';
import { Router, Request, Response, NextFunction } from 'express';
import statusCodes from '../../../../utils/constants/statusCodes';

const MusicRouter = Router();

MusicRouter.post('/create', async(req: Request, res:Response, next: NextFunction) => {
	try {
		await MusicService.create(req.body);
		res.status(statusCodes.CREATED).json('Music created successfully');
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/name/:name', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusicbyName(req.params.name);
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/id/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusicbyid(Number(req.params.id));
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/artist/:artistId', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusicbyArtist(Number(req.params.artistId));
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/album/:album', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusicbyAlbum(req.params.album);
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/genre/:genre', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusicbyGenre(req.params.genre);
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicService.getMusics();
		res.status(statusCodes.SUCCESS).json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.put('/update/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
        const id = Number(req.params.id);
        const body = req.body;
		await MusicService.update(id,body);
		res.status(statusCodes.SUCCESS).json('Music updated successfully');
	} catch (error) {
		next(error);
	}
});

MusicRouter.delete('/delete/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
        const id = Number(req.params.id);
		await MusicService.delete(id);
		res.status(statusCodes.SUCCESS).json('Music deleted successfully');
	} catch (error) {
		next(error);
	}
});

export default MusicRouter;