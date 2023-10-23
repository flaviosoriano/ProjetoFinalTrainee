/* eslint-disable indent */
import MusicController from './MusicController';
import { Router, Request, Response, NextFunction } from 'express';

const MusicRouter = Router();

MusicRouter.post('/create', async(req: Request, res:Response, next: NextFunction) => {
	try {
		await MusicController.create(req.body);
		res.json('Music created successfully');
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/:name', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusicbyName(req.params.name);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusicbyid(Number(req.params.id));
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/:artistId', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusicbyArtist(Number(req.params.artistId));
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/:album', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusicbyAlbum(req.params.album);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get/:genre', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusicbyGenre(req.params.genre);
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/get', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const music = await MusicController.getMusics();
		res.json(music);
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/update/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
        const id = Number(req.params.id);
        const body = req.body;
		await MusicController.update(id,body);
		res.json('Music updated successfully');
	} catch (error) {
		next(error);
	}
});

MusicRouter.get('/delete/:id', async(req: Request, res:Response, next: NextFunction) => {
	try {
        const id = Number(req.params.id);
		await MusicController.delete(id);
		res.json('Music deleted successfully');
	} catch (error) {
		next(error);
	}
});

export default MusicRouter;