import { Observable, of  } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppRestService, CloudAppEventsService, Request, HttpMethod, 
  Entity, RestErrorResponse, AlertService } from '@exlibris/exl-cloudapp-angular-lib';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  loading = false;
  apiResult: any;
  
  entities$: Observable<Entity[]> = this.eventsService.entities$
  entitiesMetadata$: Observable<Entity[]>;
  items$: Observable<any>;
  items: Array<any> = [];

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
    private alert: AlertService 
  ) { }


  ngOnInit() {
    this.entities$.pipe(filter(entities => entities.length > 0), 
    switchMap(entities => entities),  // switch to entity
    filter(entities => entities.type === "BIB_MMS")).subscribe({ // filter to bibs
      next: (entity) => { 
        this.restService.call(entity.link).pipe(switchMap(response => { return of(response) })).subscribe({ 
          next: (response) => {
            this.restService.call(response.holdings.link).pipe(switchMap(response => { return of(response.holding) })).subscribe({
              next: (response) => {
                console.log(response)
                 this.restService.call(response[0].link + "/items").pipe(switchMap(response => { return of(response) })).subscribe({
                  next: (response) => {
                    if(response.item) {
                      this.items.push(response.item[0].item_data)
                    }
                    
                  },
                  error: (error) => {
                    console.log(error)
                  }
                })
              }
            })
          }
        })
      }
    })


  }

  ngOnDestroy(): void {
  }



}