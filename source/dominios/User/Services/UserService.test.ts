/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
describe('getUserById', () => {
  const UserService = require('./UserService');
  const User = require('@prisma/client');
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

      await UserService.getUserbyId(idUsuario);

      expect(userFindFirstSpy).toHaveBeenCalledTimes(1);
      expect(userFindFirstSpy.mock.calls[0][0]).toBe(idUsuario);
      }
  );
  
    describe('o id de um usuário é passado como parâmetro ==> retorna os dados não sensíveis do usuario', () => {
      test.each([
        { 
          usuario:{name: 'jorge', password: 'abcd'}, 
          retornoEsperado:{name: 'jorge', password:''}
        },
        { 
          usuario:{name: 'gabi', password: 'abcdefghashud'}, 
          retornoEsperado:{name: 'gabi', password:''}
        },
        { 
          usuario:{name: 'gabriel', password: 'abcdefghijk'},
          retornoEsperado:{name: 'gabriel', password:''} 
        },
        { 
          usuario:{name: 'bernardo', password: 'abc'}, 
          retornoEsperado:{name: 'bernardo', password:''}
        },
        {
          usuario:{name: 'vinicius', password: 'a'}, 
          retornoEsperado:{name: 'vinicius', password:''}
        },
      ]) ('%j', ({usuario, retornoEsperado}) => {
        jest.spyOn(User,'findFirst').mockImplementation( () => {
          usuario.password='';
          }
        );
        return expect(UserService.getUserbyId(1)).resolves.toStrictEqual(retornoEsperado);
      });
    });
    
    test('o usuário não é encontrado ==> lança exceção', async () => {
      const id = 1;
      
      jest.spyOn(User,'findFirst').mockReturnValue(undefined);
  
      return expect(async () => {
        await UserService.getUserbyId(id);
      }).rejects.toThrow(Error);
    });
  });

describe('getUserByEmail', () => {
    const UserService = require('./UserService');
    const User = require('@prisma/client');
    
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
  
    test('o método recebe o email de um usuário ==> busca o usuário com o email informado', async () => {
          const emailUser = 'teste@hotmail.com';
          const userFindFirstSpy = jest.spyOn(User,'findFirst').mockImplementation(
            () => {
              return {email: emailUser};
            }
          ); 
  
          await UserService.getUserbyemail(emailUser);
  
          expect(userFindFirstSpy).toHaveBeenCalledTimes(1);
          expect(userFindFirstSpy.mock.calls[0][0]).toBe(emailUser);
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
          return expect(UserService.getUserbyemail('teste@email.com')).resolves.toStrictEqual(retornoEsperado);
      });
    });
    
    test('o usuário não é encontrado ==> lança exceção', async () => {
      const email = 'teste@email.com';
      
      jest.spyOn(User,'findFirst').mockReturnValue(undefined);
  
      return expect(async () => {
        await UserService.getUserbyemail(email);
      }).rejects.toThrow(Error);
    });
});