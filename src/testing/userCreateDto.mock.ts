import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../user/dto/create-user.dto';

export const createUserDtoMock: CreateUserDto = {
  name: 'Guilherme Oliveira Villarinho',
  email: 'guilherme.villarinho@cinbal.com.br',
  password: 'Ex%mpl023*',
  role: Role.Admin,
  birthAt: new Date('2023-03-02'),
};
