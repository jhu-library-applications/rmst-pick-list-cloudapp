import { Injectable } from '@angular/core';
import { CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { UserInfo } from '../interfaces/user_info.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  constructor(
    private restService: CloudAppRestService,
  ) { }

  getUserInfo(link, alert: any): Observable<UserInfo> {
    const apiUrl = link; 
    this.loadingSubject.next(true);

    return this.restService.call<UserInfo>(apiUrl).pipe(
      tap(result => console.log('result', result)),
      finalize(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        alert.error('Failed to load user info. Error: ' + error.message);
        throw error;
      })
    );
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}