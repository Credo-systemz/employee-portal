import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from 'src/app/user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor( public userSer: UserService) { }

  intercept(req, next){

    // console.log('Token request');
    var tokenizedReq = req.clone({
      setHeaders : {
        myauthkey : (this.userSer.getMyToken() ?  this.userSer.getMyToken(): '')
      }
    })
    return next.handle(tokenizedReq);
  }
}
