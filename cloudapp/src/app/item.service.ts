import { Injectable } from '@angular/core';
import { CloudAppEventsService, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
  ) { }

  getItems() {
    return this.eventsService.entities$.pipe(
      filter(entities => entities.length > 0),
      switchMap(entities => entities),
      filter(entities => entities.type === "BIB_MMS"),
      mergeMap(entity => this.restService.call(entity.link)),
      mergeMap(response => this.restService.call(response.holdings.link)),
      mergeMap(holdings => holdings.holding),
      mergeMap(holding => this.restService.call(holding['link'] + "/items")),
      mergeMap(items => items.item),
      map(item => item)
    )

  }

  sortItems(items: any) {
    return items.sort((a, b) => {
      if (a.item_data.storage_location_id < b.item_data.storage_location_id ) {
        return -1;
      }
      if (a.item_data.storage_location_id > b.item_data.storage_location_id ) {
        return 1;
      }
      return 0;
    })
  }
}
    
