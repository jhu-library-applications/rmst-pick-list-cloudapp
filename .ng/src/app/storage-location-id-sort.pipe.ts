import { Pipe, PipeTransform } from '@angular/core';
import { RequestedResource } from './interfaces/requested-resources.interface';

@Pipe({ name: 'storageLocationIdSort' })
export class StorageLocationIdSortPipe implements PipeTransform {
  transform(requestedResources: RequestedResource[], sortOrder: 'asc' | 'desc' = 'asc'): RequestedResource[] {
    if (!requestedResources) {
      return [];
    }

    return requestedResources.sort((a, b) => {
      const storageLocationIdA = a.location?.copy?.length ? a.location.copy[0].storage_location_id : '';
      const storageLocationIdB = b.location?.copy?.length ? b.location.copy[0].storage_location_id : '';

      return sortOrder === 'asc'
        ? storageLocationIdA.localeCompare(storageLocationIdB)
        : storageLocationIdB.localeCompare(storageLocationIdA);
    });
  }
}