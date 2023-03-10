import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CloudAppRestService, CloudAppEventsService, Entity, AlertService
} from '@exlibris/exl-cloudapp-angular-lib';
import { Item } from '../interfaces/item.model';
import { ItemService } from '../item.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  loading = false;
  apiResult: any;
  entities$: Observable<Entity[]> = this.eventsService.entities$;
  items: Array<Item> = [];
  itemCount = 0;
  selectOptions = [
    { value: '', label: 'Select an option' },
    { value: 'all', label: 'Show All' },
    { value: 'noblank', label: 'Hide Blank RMSTs' },
  ];

  selectedOption = this.selectOptions[0].value;
  
  selectOption(event: Event) {
    this.items.forEach(item => {
      if (this.selectedOption == 'all') {
        item.item_data.hidden = false;
      } else if (this.selectedOption == 'noblank') {
        if (item.item_data.storage_location_id == '' || item.item_data.storage_location_id == 'roo') {
          item.item_data.hidden = true;
        } else {
          item.item_data.hidden = false;
        }
      }
    });

    this.itemCount = this.items.filter(item => item.item_data.hidden == false).length;
  }
  today: number = Date.now();

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
    private alert: AlertService,
    private itemService: ItemService
  ) { }

  removeItem(item: Item) {
    this.items = this.items.filter(i => i !== item);
  }

  ngOnInit() {
    this.itemService = new ItemService(this.restService, this.eventsService);
    this.itemService.getItems().subscribe({
      next: (item) => { 
        this.items.push(item as Item);
        this.itemService.sortItems(this.items);
        this.itemCount = this.items.length;
        this.items.forEach(item => item.item_data.hidden = false);
      },
      error: (err) => { this.alert.error(err) }
    })


  }

  ngOnDestroy(): void {
  }



}