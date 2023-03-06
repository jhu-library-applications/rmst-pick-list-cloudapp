export type Requests = RequestData[]

export interface RequestData {
  title: string
  volume: string
  issue: string
  part: string
  barcode: string
  user_primary_id: string
  request_id: string
  additional_id: string
  request_type: string
  request_sub_type: RequestSubType
  mms_id: string
  pickup_location: string
  pickup_location_type: string
  managed_by_library: string
  managed_by_circulation_desk: string
  managed_by_library_code: string
  managed_by_circulation_desk_code: string
  material_type: MaterialType
  date_of_publication: string
  request_status: string
  request_date: string
  request_time: string
  task_name: string
  expiry_date: string
  item_id: string
}

export interface RequestSubType {
  value: string
  desc: string
}

export interface MaterialType {
  value: string
  desc: string
}
