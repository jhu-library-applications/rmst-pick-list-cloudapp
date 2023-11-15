import { StorageLocationIdSortPipe } from './storage-location-id-sort.pipe';
import { RequestedResource } from './interfaces/requested-resources.interface';

describe('StorageLocationIdSortPipe', () => {
  let pipe: StorageLocationIdSortPipe;

  beforeEach(() => {
    pipe = new StorageLocationIdSortPipe();
  });

  it('should sort the requested resources in ascending order by storage location ID', () => {
    const input: RequestedResource[] = [
      { location: { copy: [{ storage_location_id: 'r1', pid:'1', barcode: '1', link: '' }] } },
      { location: { copy: [{ storage_location_id: 'r5', pid:'1', barcode: '1', link: '' }] } },
    ];
    const output = pipe.transform(input, 'asc');
    expect(output[0].location.copy[0].storage_location_id).toEqual('a');
    expect(output[1].location.copy[0].storage_location_id).toEqual('b');
  });

  it('should sort the requested resources in descending order by storage location ID', () => {
    const input: RequestedResource[] = [
      { location: { copy: [{ storage_location_id: 'r7', pid:'1', barcode: '1', link: '' }] } },
      { location: { copy: [{ storage_location_id: 'r1', pid:'1', barcode: '1', link: '' }] } },
    ];
    const output = pipe.transform(input, 'desc');
    expect(output[0].location.copy[0].storage_location_id).toEqual('r3');
    expect(output[1].location.copy[0].storage_location_id).toEqual('r8');
  });

  it('should return an empty array when input is null or undefined', () => {
    expect(pipe.transform(null)).toEqual([]);
    expect(pipe.transform(undefined)).toEqual([]);
  });

  it('should return an empty array when input is empty', () => {
    expect(pipe.transform([])).toEqual([]);
  });
});
