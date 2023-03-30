import { Injectable } from '@angular/core';
import { CloudAppEventsService, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, filter, finalize, map, switchMap, toArray } from 'rxjs/operators';
import { Item } from './interfaces/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public loading: boolean = false;

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
  ) { }

  getItems(): Observable<{}> {
    this.loading = true;
    
    return this.eventsService.entities$.pipe(
      filter(entities => entities.length > 0),
      mergeMap(entities => entities),
      filter(entities => entities.type === "BIB_MMS"), 
      mergeMap(entity => this.restService.call(entity.link)),
      mergeMap(response => this.restService.call(response.holdings.link)), 
      mergeMap(holdings => holdings.holding), 
      mergeMap(holding => this.restService.call(holding['link'] + "/items")), 
      mergeMap(items => items.item),
      mergeMap(item => this.restService.call(item['link'] + "/requests").pipe(
        map(requests => { 
          if (requests.user_request) {
            item['request_data'] = requests.user_request;
            return item;
          } else {
            return item;
          }
        })
      )),
      filter(item => item['request_data'] !== undefined), 
      filter(item => item['request_data'][0]['user_primary_id'] !== undefined), 
      mergeMap(item => this.restService.call(`/almaws/v1/users/${item['request_data'][0]['user_primary_id']}`).pipe(
        map(user => { 
          item['user_data'] = user; 
          return item
        })
      ).pipe(
        finalize(() => {
          this.loading = false;
        })
      ))
    )
  }

  sortItems(items: Item[]): Item[] {
    return items.sort((a, b) => {
      if (a.item_data.storage_location_id < b.item_data.storage_location_id) {
        return -1;
      }
      if (a.item_data.storage_location_id > b.item_data.storage_location_id) {
        return 1;
      }
      return 0;
    })
  }
}

