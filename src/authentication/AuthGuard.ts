import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    const token = request.headers.authorization.split(' ')[1]; // Assuming the token is in the format 'Bearer <token>'
    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace this with your actual secret key
      console.log('decoded', decoded)
      // Your additional verification logic here
      return true; // Return true if the token is valid
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
