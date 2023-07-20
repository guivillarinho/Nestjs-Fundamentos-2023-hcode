import { Role } from '../../enums/role.enum';
import { UserEntity } from '../../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Guilherme Villarinho',
    email: 'guilherme.villarinho@cinbal.com.br',
    birthAt: new Date('2023-03-02'),
    id: 1,
    password: '$2b$08$rr7HwHcVSEADRYS1T66W9u7RHuNQci9RDJdrBH.uLeu97.gfJ4GhG',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Arthur Oliveira',
    email: 'arthur.oliveira@cinbal.com.br',
    birthAt: new Date('2023-03-02'),
    id: 2,
    password: '$2b$08$rr7HwHcVSEADRYS1T66W9u7RHuNQci9RDJdrBH.uLeu97.gfJ4GhG',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mateus Moura',
    email: 'mateus.moura@cinbal.com.br',
    birthAt: new Date('2023-03-02'),
    id: 3,
    password: '$2b$08$rr7HwHcVSEADRYS1T66W9u7RHuNQci9RDJdrBH.uLeu97.gfJ4GhG',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
