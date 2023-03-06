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
      filter(entities => entities.type === "BIB_MMS"), // Only work with entitites that have a BIB_MMS type
      mergeMap(entity => this.restService.call(entity.link)), // Make an API call to get the title level metadata
      mergeMap(response => this.restService.call(response.holdings.link)), // Make an API call to get the holdings level metadata
      mergeMap(holdings => holdings.holding), // Map the holdings to the title level metadata
      mergeMap(holding => this.restService.call(holding['link'] + "/items")), // Get the item level metadata
      mergeMap(items => items.item),
      mergeMap(item => this.restService.call(item['link'] + "/requests").pipe(
        map(requests => { // map any requests to the item
          if (requests.user_request) {
            item['request_data'] = requests.user_request;
            return item;
          } else {
            return item;
          }
        })
      )),
      filter(item => item['request_data'] !== undefined), // filter out items that don't have request data
      filter(item => item['request_data'][0]['user_primary_id'] !== undefined), // filter out items that don't have a user_primary_id
      mergeMap(item => this.restService.call(`/almaws/v1/users/${item['request_data'][0]['user_primary_id']}`).pipe(
        map(user => { // Map user data to the item
          item['user_data'] = user; 
          return item;
        }
        )
      ))
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

