export interface UserInfo {
    gender: Gender
    password: string
    status: Status
    record_type: RecordType
    primary_id: string
    first_name: string
    middle_name: string
    last_name: string
    full_name: string
    user_title: UserTitle
    job_category: JobCategory
    job_description: string
    user_group: UserGroup
    campus_code: CampusCode
    web_site_url: string
    cataloger_level: CatalogerLevel
    preferred_language: PreferredLanguage
    account_type: AccountType
    external_id: string
    force_password_change: string
    status_date: string
    contact_info: ContactInfo
    user_identifier: any[]
    user_role: UserRole[]
    user_block: any[]
    user_note: any[]
    user_statistic: any[]
    proxy_for_user: any[]
    rs_library: RsLibrary[]
    pref_first_name: string
    pref_middle_name: string
    pref_last_name: string
    pref_name_suffix: string
    is_researcher: boolean
  }
  
  export interface Gender {
    value: string
    desc: string
  }
  
  export interface Status {
    value: string
    desc: string
  }
  
  export interface RecordType {
    value: string
    desc: string
  }
  
  export interface UserTitle {
    value: string
    desc: string
  }
  
  export interface JobCategory {
    value: string
    desc: string
  }
  
  export interface UserGroup {
    value: string
    desc: string
  }
  
  export interface CampusCode {
    desc: string
  }
  
  export interface CatalogerLevel {
    value: string
    desc: string
  }
  
  export interface PreferredLanguage {
    value: string
    desc: string
  }
  
  export interface AccountType {
    value: string
    desc: string
  }
  
  export interface ContactInfo {
    address: any[]
    email: any[]
    phone: any[]
  }
  
  export interface UserRole {
    status: Status2
    scope: Scope
    role_type: RoleType
    parameter: Parameter[]
  }
  
  export interface Status2 {
    value: string
    desc: string
  }
  
  export interface Scope {
    value: string
    desc: string
  }
  
  export interface RoleType {
    value: string
    desc: string
  }
  
  export interface Parameter {
    type: Type
    scope?: Scope2
    value: Value
  }
  
  export interface Type {
    value: string
  }
  
  export interface Scope2 {
    value: string
    desc: string
  }
  
  export interface Value {
    value: string
    desc: string
  }
  
  export interface RsLibrary {
    code: Code
  }
  
  export interface Code {
    value: string
    desc: string
  }
  