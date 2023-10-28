import ArtistService from '../Services/ArtistService';
import { Router, Request, Response, NextFunction } from 'express';

const ArtistRouter = Router();

ArtistRouter.post('/create', async(req: Request, res:Response, next: NextFunction) => {
	try {
		const response = await ArtistService.create(req.body);
		res.json(response);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.get('/get', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const artists = await ArtistService.getArtists();
		res.json(artists);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.get('/get/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const artist = await ArtistService.getArtistById(id);
		res.json(artist);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const response = await ArtistService.update(id, req.body);
		res.json(response);
	} catch (error) {
		next(error);
	}
});

ArtistRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const response = await ArtistService.delete(id);
		res.json(response);
	} catch (error) {
		next(error);
	}
});

/*ArtistRouter.get('/get/musics', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const musics = await ArtistService.getallArtistsMusics();
		res.json(musics);
	} catch (error) {
		next(error);
	}
});*/

export default ArtistRouter;