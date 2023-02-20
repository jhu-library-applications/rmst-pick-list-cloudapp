import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable', () => {
    expect(service.getItems()).toBeInstanceOf(Observable);
  });

});
