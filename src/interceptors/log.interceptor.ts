import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const dt = Date.now()
        const routes = context.switchToHttp().getRequest()

        return next.handle().pipe(tap(() => {
            console.log(`URL: ${routes.url}`)
            console.log(`A execução levou: ${Date.now() - dt} milisegundos.`)
        }))
        
    } 
}