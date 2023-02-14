import { Injectable } from '@angular/core';
import { CloudAppEventsService, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

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
      tap(items => console.log(items)),
      mergeMap(item => this.restService.call(item['link'] + "/requests").pipe(
        map(requests => {
          if (requests.user_request) {
            item['request_data'] = requests.user_request;
            return item;
          } else {
            item['request_data'] = [{ user_primary_id: null }];
            return item;
          }
        })
      )),
      filter(item => item['request_data'][0]['user_primary_id'] !== null), // filter out items that don't have a user_primary_id
      mergeMap(item => this.restService.call(`/almaws/v1/users/${item['request_data'][0]['user_primary_id']}`).pipe(
        map(user => {
          item['user_data'] = user;
          return item;
        }
        )
      )),
      tap(items => console.log(items))
    )

  }

  sortItems(items: any) {
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

