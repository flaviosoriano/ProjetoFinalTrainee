/* eslint-disable indent */
import MusicService from '../Services/MusicService';
import { Router, Request, Response, NextFunction } from 'express';
import statusCodes from '../../../../utils/constants/statusCodes';
import { verifyJWT } from '../../../middlewares/authentication';

const MusicRouter = Router();

MusicRouter.post('/create', verifyJWT, 
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			await MusicService.create(req.body);
			res.status(statusCodes.CREATED).json('Music created successfully');
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get/name/:name', verifyJWT,
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusicbyName(req.params.name);
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get/id/:id', verifyJWT,
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusicbyid(Number(req.params.id));
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get/artist/:artistId', verifyJWT,
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusicbyArtist(Number(req.params.artistId));
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get/album/:album', verifyJWT,
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusicbyAlbum(req.params.album);
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get/genre/:genre', verifyJWT,
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusicbyGenre(req.params.genre);
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.get('/get', verifyJWT, 
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const music = await MusicService.getMusics();
			res.status(statusCodes.SUCCESS).json(music);
		} catch (error) {
			next(error);
		}
	});

MusicRouter.put('/update/:id', verifyJWT, 
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			await MusicService.update(id,body);
			res.status(statusCodes.SUCCESS).json('Music updated successfully');
		} catch (error) {
			next(error);
		}
	});

MusicRouter.delete('/delete/:id', verifyJWT, 
	async(req: Request, res:Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			await MusicService.delete(id);
			res.status(statusCodes.SUCCESS).json('Music deleted successfully');
		} catch (error) {
			next(error);
		}
	});

export default MusicRouter;