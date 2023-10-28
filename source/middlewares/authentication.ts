import { Request, Response, NextFunction } from 'express';
import { LoginError } from '../../errors/LoginError';
import UserService from '../dominios/User/Services/UserService';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { TokenError } from '../../errors/TokenError';
import statusCodes from '../../utils/constants/statusCodes';



function generateJWT(user: User, res: Response) {
	const body = {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role
	};

	const token = jwt.sign({user: body}, process.env.SECRET_KEY, 
		{expiresIn: process.env.JWT_EXPIRATION});
	
	res.cookie('twt', token, {
		httpOnly: true,
		secure: false
	});
}

function cookieExtractor(req: Request) {
	let token = null;

	if (req && req.cookies) {
		token = req.cookies['twt'];
	}

	return token;
}

function verifyJWT(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);
		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
			req.user = decoded.user;
		}
		if (req.user == null) {
			throw new TokenError('User must be logged in to do this');
		}
		next();
	} catch (error) {
		next(error);
	}
}

async function NotLoggedin(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);
		if (token == null) {
			next();
		} else{
			throw new LoginError('User already logged in');
		}
	} catch (error) {
		next(error);
	}
}

async function LoginMid(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await UserService.getUserbyemail(req.body.email);
		if (user == null) {
			throw new LoginError('given email or password is not correct');
		} else{
			const valid = await bcrypt.compare(req.body.password, user.password);
			if(!valid){
				throw new LoginError('given email or password is not correct');
			}
		}
		generateJWT(user, res);

		res.status(statusCodes.NO_CONTENT).end();

	} catch (error) {
		next(error);
	}
}
export {LoginMid, verifyJWT, NotLoggedin};