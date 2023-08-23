import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestedResource } from '../interfaces/requested-resources.interface';

@Component({
  selector: 'app-sort-checkbox',
  templateUrl: './sort-checkbox.component.html'
})
export class SortCheckboxComponent {
  @Input() sortRequestAsc: boolean;
  @Output() sortRequestAscChange = new EventEmitter<boolean>();

  onChange() {
    this.sortRequestAscChange.emit(this.sortRequestAsc);
  }
}
