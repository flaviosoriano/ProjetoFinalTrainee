import prisma from "../../../../client/client";
import {User} from '@prisma/client'

class UserService{
    async create(body:User) {
        const user = await prisma.user.create({
            data: {
                nome: body.nome,
                email: body.email,
                senha: body.senha,
                foto: body.foto,
                cargo: body.cargo
            }
        })
    }
}

export default new UserService