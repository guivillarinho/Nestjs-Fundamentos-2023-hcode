import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
/**
 * Guarda de verificação de autenticação JWT válido
 */
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    //Pegando o request da requisição e depois é pego somente o campo de authorization que vem do request.headers ("Cabeçalhos da requisição")
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    //Após pegar o authorization, é feito uma checagem do token recebido. Com isso, passamos esse valor para uma parte personalizada chamada reques.tokenPayload. E por fim retornamos true para permitir acesso na rota.
    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      ); //Pegando somente a parte 1 do array com o token, para aí sim retornar o payload, e fazendo o check do token.

      request.tokenPayload = data;

      //Criando outro request personalizado que vai retornar o usuário logado.
      request.user = await this.userService.readUniqueUser(data.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
