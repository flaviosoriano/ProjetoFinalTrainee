/**
 * Caso uma rota inválida ou inapropriada esteja sendo acessada.
 */
/* eslint-disable indent */
export class InvalidRouteError extends Error {
	constructor(msg: string) {
		super(msg);
		this.name = 'InvalidRouteError';
	}
}