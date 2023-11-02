/* eslint-disable indent */
import Role from '../../utils/constants/Role';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { cookieExtractor } from '../middlewares/authentication';
import UserService from '../dominios/User/Services/UserService';
import { PermissionError } from '../../errors/PermissionError';

async function CheckRole(req: Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);
        const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
        const user = UserService.getUserbyId(Number(decoded.sub));
        if((await user).role==Role.USER) {
            throw new PermissionError('Only adminstrators can do this.');
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default CheckRole;