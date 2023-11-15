import { Pipe, PipeTransform } from '@angular/core';
import { RequestedResource } from '../interfaces/requested-resources.interface';

@Pipe({ name: 'applySort',  pure: false })
export class ApplySortPipe implements PipeTransform {
    transform(requestedResources: RequestedResource[], selectedSort: string): RequestedResource[] {
        switch (selectedSort) {
            case 'storageLocationIdSort':
                return this.storageLocationIdSort(requestedResources, 'asc');
            case 'requestDateSort': 
                return this.requestDateSort(requestedResources);
                break;
            default:
                return requestedResources;
        }
    }

    private storageLocationIdSort(requestedResources: RequestedResource[], sortOrder: 'asc' | 'desc'): RequestedResource[] {
        if (!requestedResources) {
            return [];
        }

        // If you sort the original array, it will only work the first time.
        const copy = [...requestedResources];

        return copy.sort((a, b) => {
            const storageLocationIdA = a.location?.copy?.length ? a.location.copy[0].storage_location_id : '';
            const storageLocationIdB = b.location?.copy?.length ? b.location.copy[0].storage_location_id : '';

            return sortOrder === 'asc'
                ? storageLocationIdA.localeCompare(storageLocationIdB)
                : storageLocationIdB.localeCompare(storageLocationIdA);
        });
    }

    private requestDateSort(requestedResources: RequestedResource[]): RequestedResource[] {
        const copy = [...requestedResources];

        return copy.sort((a, b) => {
   
          const dateA = a.request[0]?.request_date ? new Date(a.request[0].request_date) : new Date('1900-01-01T00:00:00Z');
          const dateB = b.request[0]?.request_date ? new Date(b.request[0].request_date) : new Date('1900-01-01T00:00:00Z');
    
          return dateA.getTime() - dateB.getTime();
        });
      }
    
}
