import { Injectable } from '@angular/core';
import { CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { RequestedResources } from '../interfaces/requested-resources.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestedResourcesService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  constructor(
    private restService: CloudAppRestService,
  ) { }

  getRequestedResources(library: string, circ_desk: string, limit: number, alert: any): Observable<RequestedResources> {
    const apiUrl = `/almaws/v1/task-lists/requested-resources?library=${library}&circ_desk=${circ_desk}&limit=${limit.toString()}`; 
    this.loadingSubject.next(true);

    return this.restService.call<RequestedResources>(apiUrl).pipe(
      tap(result => console.log('result', JSON.stringify(result))),
      finalize(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        alert.error('Failed to retrieve resource: ' + error.message);
        throw error;
      })
    );
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
