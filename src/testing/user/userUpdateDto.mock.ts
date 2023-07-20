import { Role } from '../../enums/role.enum';
import { UpdateUserDtoTypePut } from '../../user/dto/updateTypePut-user.dto';

export const updateUserDtoMock: UpdateUserDtoTypePut = {
  name: 'Guilherme Villarinho Oliveira',

  email: 'guilherme.villarinho15@cinbal.com.br',
  password: 'Vill@23*',
  role: Role.Admin,
  birthAt: new Date('2024-02-01'),
};
