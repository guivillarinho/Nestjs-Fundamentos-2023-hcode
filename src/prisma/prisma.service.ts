import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import {PrismaClient} from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit
{
    async onModuleInit() {
       await this.$connect()
    }

    /**
     * Desligando a conexão com o banco de dados quando terminar a requisição
     */
    async enableShutdownHooks(app: INestApplication){
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }

}