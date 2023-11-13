/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
describe('getUserById', () => {
    const userService = require('./UserService');
    const User = require('../models/User');
    
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });
  
    test('o método recebe o id de um usuário ==> busca o usuário com o id informado', async () => {
      const idUsuario = 1;
      const userFindFirstSpy = jest.spyOn(User,'findFirst').mockImplementation(
        () => {
          return {id: idUsuario};
        }
      ); 

      await userService.getUserById(idUsuario);

      expect(userFindFirstSpy).toHaveBeenCalledTimes(1);
      expect(userFindFirstSpy.mock.calls[0][0]).toBe(idUsuario);
      }
  );
  
    describe('o id de um usuário é passado como parâmetro ==> retorna os dados não sensíveis do usuario', () => {
      test.each([
        { 
          usuario:{name: 'jorge',password: 'abcd'}, 
          retornoEsperado:{name: 'jorge', password:''}
        },
        { 
          usuario:{name: 'gabi', password: 'abcdefghashud'}, 
          retornoEsperado:{name: 'gabi', password:''}
        },
        { 
          usuario:{name: 'gabriel',password: 'abcdefghijk'},
          retornoEsperado:{name: 'gabriel', password:''} 
        },
        { 
          usuario:{name: 'bernardo',password: 'abc'}, 
          retornoEsperado:{name: 'bernardo', password:''}
        },
        {
          usuario:{name: 'vinicius',password: 'a'}, 
          retornoEsperado:{name: 'vinicius', password:''}
        },
      ]) ('%j', ({usuario, retornoEsperado}) => {
        jest.spyOn(User,'findFirst').mockImplementation( () => {
          usuario.password='';
          }
        );
        return expect(userService.getUserById(1)).resolves.toStrictEqual(retornoEsperado);
      });
    });
    
    test('o usuário não é encontrado ==> lança exceção', async () => {
      const id = 1;
      
      jest.spyOn(User,'findFirst').mockReturnValue(undefined);
  
      return expect(async () => {
        await userService.getUserById(id);
      }).rejects.toThrow(Error);
    });
  });

/*describe('getUserByEmail', () => {
    const userService = require('./UserService');
    const User = require('../models/User');
    
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
  
    test('o método recebe o id de um usuário ==> busca o usuário com o id informado', async () => {
          const idUsuario = 1;
          const userFindFirstSpy = jest.spyOn(User,'findFirst').mockImplementation(
            () => {
              return {id: idUsuario};
            }
          ); 
  
          await userService.getUserById(idUsuario);
  
          expect(userFindFirstSpy).toHaveBeenCalledTimes(1);
          expect(userFindFirstSpy.mock.calls[0][0]).toBe(idUsuario);
      }
  );
  
    describe('o id de um usuário é passado como parâmetro ==> retorna os dados não sensíveis do usuario', () => {
      test.each([
          { 
            usuario:{name: 'jorge',password: 'abcd'}, 
            retornoEsperado:{name: 'jorge', password:''}
          },
          { 
            usuario:{name: 'gabi', password: 'abcdefghashud'}, 
            retornoEsperado:{name: 'gabi', password:''}
          },
          { 
            usuario:{name: 'gabriel',password: 'abcdefghijk'},
            retornoEsperado:{name: 'gabriel', password:''} 
          },
          { 
            usuario:{name: 'bernardo',password: 'abc'}, 
            retornoEsperado:{name: 'bernardo', password:''}
          },
          {
            usuario:{name: 'vinicius',password: 'a'}, 
            retornoEsperado:{name: 'vinicius', password:''}
          },
        ]) ('%j', ({usuario, retornoEsperado}) => {
          jest.spyOn(User,'findFirst').mockImplementation( () => {
            usuario.password='';
            }
          );
          return expect(userService.getUserById(1)).resolves.toStrictEqual(retornoEsperado);
      });
    });
    
    test('o usuário não é encontrado ==> lança exceção', async () => {
      const id = 1;
      
      jest.spyOn(User,'findFirst').mockReturnValue(undefined);
  
      return expect(async () => {
        await userService.getUserById(id);
      }).rejects.toThrow(QueryError);
    });
});*/