import { SetMetadata } from '@nestjs/common'
import { Role } from '../enums/role.enum'

/**
 * Função para pegar vários enums, distribuir esses enums dentro do parâmetro, utilizar o setMetadata para passar os dois argumentos e transformar em um objeto.
 */
export const RolesDecorator = (...roles: Role[]) => SetMetadata('roles', roles)

//Quando passamos o Role[] queremos dizer que estamos pegando vários, pois foram mais de um valor dentro do enum que foi criado. 

//Quando passamos o spread operator, estamos distribuindo os valores dos enums em cada um deles.