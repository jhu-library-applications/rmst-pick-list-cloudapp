export interface RequestedResources {
    requested_resource: RequestedResource[]
    total_record_count: number
  }
  
  export interface RequestedResource {
    location: Location
    resource_metadata: ResourceMetadata
    request: Request[]
  }
  
  export interface Location {
    library: Library
    holding_id: HoldingId
    shelving_location: string
    copy: Copy[]
    call_number?: string
  }
  
  export interface Library {
    value: string
    desc: string
  }
  
  export interface HoldingId {
    value: string
    link: string
  }
  
  export interface Copy {
    pid: string
    barcode: string
    base_status: BaseStatus
    alternative_call_number: string
    storage_location_id: string
    link: string
  }
  
  export interface BaseStatus {
    value: string
    desc: string
  }
  
  export interface ResourceMetadata {
    title: string
    author?: string
    isbn?: string
    publisher?: string
    mms_id: MmsId
    publication_place?: string
    publication_year: string
    issn?: string
  }
  
  export interface MmsId {
    value: string
    link: string
  }
  
  export interface Request {
    description: any
    id: string
    destination: Destination
    requester: Requester
    printed: boolean
    reported: boolean
    request_type: string
    request_sub_type: RequestSubType
    request_date: string
    request_time: string
    link: string
    comment?: string
    email: string
  }
  
  export interface Destination {
    value: string
    desc: string
  }
  
  export interface Requester {
    desc: string
    link?: string
  }
  
  export interface RequestSubType {
    value: string
    desc?: string
  }
  