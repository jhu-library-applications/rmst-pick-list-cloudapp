export interface Policy {
    value: string;
}

export interface Provenance {
    value: string;
}

export interface Library {
    value: string;
    desc: string;
}

export interface Location {
    value: string;
    desc: string;
}

export interface BaseStatus {
    value: string;
    desc: string;
}

export interface PhysicalMaterialType {
    value: string;
    desc: string;
}

export interface BreakIndicator {
    value: string;
}

export interface PatternType {
    value: string;
}

export interface ProcessType {
    value: string;
    desc: string;
}

export interface AlternativeCallNumberType {
    value: string;
}

export interface PhysicalCondition {
}

export interface CommittedToRetain {
}

export interface RetentionReason {
    value: string;
}

export interface Item {
    pid: string;
    barcode: string;
    policy: Policy;
    provenance: Provenance;
    description: string;
    library: Library;
    location: Location;
    pages: string;
    pieces: string;
    requested: boolean;
    creation_date: string;
    modification_date: string;
    base_status: BaseStatus;
    awaiting_reshelving: boolean;
    physical_material_type: PhysicalMaterialType;
    po_line: string;
    expected_arrival_date: string;
    year_of_issue: string;
    enumeration_a: string;
    enumeration_b: string;
    enumeration_c: string;
    enumeration_d: string;
    enumeration_e: string;
    enumeration_f: string;
    enumeration_g: string;
    enumeration_h: string;
    chronology_i: string;
    chronology_j: string;
    chronology_k: string;
    chronology_l: string;
    chronology_m: string;
    break_indicator: BreakIndicator;
    pattern_type: PatternType;
    linking_number: string;
    type_of_unit: string;
    receiving_operator: string;
    process_type: ProcessType;
    inventory_number: string;
    inventory_price: string;
    alternative_call_number: string;
    alternative_call_number_type: AlternativeCallNumberType;
    storage_location_id: string;
    public_note: string;
    fulfillment_note: string;
    internal_note_1: string;
    internal_note_2: string;
    internal_note_3: string;
    statistics_note_1: string;
    statistics_note_2: string;
    statistics_note_3: string;
    physical_condition: PhysicalCondition;
    committed_to_retain: CommittedToRetain;
    retention_reason: RetentionReason;
    retention_note: string;
}