import prisma from "../../../../client/client";
import {Usuario} from '@prisma/client'

class UserService{
    async create(body:Usuario) {
        const user = await prisma.usuario.create({
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