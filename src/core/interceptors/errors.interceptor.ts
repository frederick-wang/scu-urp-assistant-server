import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Result } from '../../common/interfaces/result.interface'

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    return next.handle().pipe(
      catchError(
        (error): Promise<Result> => {
          if (error instanceof HttpException) {
            return Promise.resolve({
              error: {
                title: `HTTP 错误 ${error.getStatus()}`,
                code: error.getStatus(),
                message: error.getResponse().toString()
              }
            })
          }
          return Promise.resolve({
            error: {
              code: 500,
              title: '服务器内部错误',
              message: error.toString()
            }
          })
        }
      )
    )
  }
}
