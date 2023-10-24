/**
 * Dados informados para uma requisição no banco de dados são incompatíveis
 * ou inválidos.
 */
/* eslint-disable indent */
export class QueryError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'QueryError';
    }
}