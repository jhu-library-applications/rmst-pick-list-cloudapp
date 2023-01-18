import { Observable, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CloudAppRestService, CloudAppEventsService, Entity, AlertService
} from '@exlibris/exl-cloudapp-angular-lib';
import { Item } from '../models/item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  loading = false;
  apiResult: any;

  entities$: Observable<Entity[]> = this.eventsService.entities$

  items: Array<Item> = [];

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService,
    private alert: AlertService,
    private itemService: ItemService
  ) { }


  ngOnInit() {
    this.itemService = new ItemService(this.restService, this.eventsService);
    this.itemService.getItems().subscribe({
      next: (item) => { this.items.push(item as Item); this.itemService.sortItems(this.items) },
      error: (err) => { this.alert.error(err) }
    })


  }

  ngOnDestroy(): void {
  }



}