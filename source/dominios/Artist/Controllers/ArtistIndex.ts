import ArtistController from './ArtistController';
import { Router, Request, Response, NextFunction } from 'express';

const ArtistRouter = Router();

ArtistRouter.post('/create', async(req: Request, res:Response, next: NextFunction) => {
	try {
		await ArtistController.create(req.body);
		res.json('Artist created successfully');
	} catch (error) {
		next(error);
	}
});

ArtistRouter.get('/get', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const artists = await ArtistController.getArtists();
		res.json(artists);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.get('/get/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const artist = await ArtistController.getArtistbyId(id);
		res.json(artist);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.get('/get/musics', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const musics = await ArtistController.getallArtistsMusics();
		res.json(musics);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		await ArtistController.update(id, req.body);
		res.json('Artist updated successfully');
	} catch (error) {
		next(error);
	}
});

ArtistRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		await ArtistController.delete(id);
		res.json('Artist deleted successfully');
	} catch (error) {
		next(error);
	}
});


export default ArtistRouter;