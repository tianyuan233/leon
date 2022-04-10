import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { responseLogger } from 'src/logger';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const code = response.statusCode;
        const url = request.originalUrl;
        const res = {
          code,
          msg: null,
          success: true,
          data,
        };
        responseLogger.info(url, res);
        return res;
      }),
    );
  }
}
