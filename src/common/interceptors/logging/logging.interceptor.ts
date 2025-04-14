import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const method = request.method;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const url = request.url;
    console.log(
      `[Request] ${method} ${url} - Start at ${new Date().toISOString()}`,
    );
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[Response] ${method} ${url} - Time : ${Date.now() - now}ms`,
          ),
        ),
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .pipe(map((value) => (value === 'Test1' ? 'Test Test' : value)))
  }
}
