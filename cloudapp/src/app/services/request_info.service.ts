import { Injectable } from '@angular/core';
import { CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestInfoService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  constructor(
    private restService: CloudAppRestService,
  ) { }

  getRequestInfo(link, alert: any): Observable<any> {
    const apiUrl = link; 
    this.loadingSubject.next(true);

    return this.restService.call<any>(apiUrl).pipe(
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
