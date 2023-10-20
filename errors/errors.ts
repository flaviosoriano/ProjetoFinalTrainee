export class ParametroInvalido extends Error{
	constructor(message: string){
		super(message);
		this.name = 'ParametroInvalido';
	}
}

