/* eslint-disable indent */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { cookieExtractor } from '../middlewares/authentication';
import { PermissionError } from '../../errors/PermissionError';

async function CheckRole(req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);
        const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
        req.user = decoded.user;
        if(req.user.role == 'USER') {
            throw new PermissionError('Only adminstrators can do this.');
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default CheckRole;