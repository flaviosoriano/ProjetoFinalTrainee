import { Request, Response, NextFunction } from 'express';
import { LoginError } from '../../errors/LoginError';
import UserService from '../dominios/User/Services/UserService';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '@prisma/client';
import cookieParser from 'cookie-parser';

async function generateJWT(user: User, res: Response) {
	const body = {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role
	};

	const token = jwt.sign({user: body}, process.env.SECRET_KEY as string, 
		{expiresIn: process.env.JWT_EXPIRATION});
	
	res.cookie('twt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
	});
}

async function cookieExtractor(req: Request) {
	let token = null;

	if (req && req.cookies) {
		token = req.cookies['twt'];
	}

	return token;
}

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
	try {
		const token = await cookieExtractor(req);
		if (token != null) {
			const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
		}
	} catch (error) {
		
	}
}

async function LoginMid(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await UserService.getUserbyemail(req.body.email);
		if (user == null) {
			throw new LoginError('Error: given email or password is not correct');
		} else{
			const valid = await bcrypt.compare(req.body.password, user.password);
			if(!valid){
				throw new LoginError('Error: given email or password is not correct');
			}
		}

	} catch (error) {
          
	}
}