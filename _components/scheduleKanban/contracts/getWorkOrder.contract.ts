// Generated by https://quicktype.io

export interface WorkOrders {
    data: DataWorkOrder[];
    meta: Meta;
}

export interface DataWorkOrder {
    workdayTransactions: null;
    carrierId: number;
    carrier: null;
    stationId: number;
    station: null;
    customerId: number;
    customer: null;
    acTypeId: number;
    acType: null;
    operationTypeId: number;
    operationType: null;
    statusId: number;
    workOrderStatus: null;
    inboundOriginAirportId: number | null;
    inboundOriginAirport: null;
    outboundDestinationAirportId: number;
    outboundDestinationAirport: null;
    contractId: number;
    contract: null;
    responsibleId: number;
    responsible: null;
    flightStatusId: number | null;
    flightStatus: null;
    scheduleStatusId: null;
    scheduleStatus: null;
    workOrderItems: any[];
    gateId: number;
    gate: null;
    companyId: number;
    company: null;
    businessUnitId: number;
    businessUnit: null;
    schedulerId: null;
    scheduler: null;
    adHoc: boolean;
    customCustomer: boolean;
    inboundCustomFlightNumber: boolean | null;
    needToBePosted: boolean;
    customCustomerName: null;
    remark: string;
    delay: any[];
    safetyMessage: null | string;
    customerSignature: null;
    customerName: null;
    customerTitle: null;
    representativeSignature: null | string;
    representativeName: string;
    representativeTitle: string;
    scheduleDate: string;
    date: null;
    referenceId: string;
    inboundFlightNumber: string;
    inboundTailNumber: null | string;
    inboundScheduledArrival: null | string;
    inboundBlockIn: string;
    estimatedOnUtc: null;
    inboundCargoTotalUldsUnloaded: number | null;
    inboundCargoBulkUnloaded: number | null;
    outboundFlightNumber: string;
    outboundFaFlightId: null;
    outboundTailNumber: string;
    outboundScheduledDeparture: string;
    outboundBlockOut: string;
    estimatedOffUtc: null;
    calendarTitle: string;
    outboundCustomFlightNumber: boolean | null;
    outboundCargoTotalUldsLoaded: number;
    outboundCargoBulkLoaded: number | null;
    cargoTotalKilosLoaded: null;
    cargoTotalKilosUnloaded: null;
    preFlightNumber: string;
    faFlightId: null;
    faFlightStatus: null;
    comments: number;
    sta: null | string;
    std: null | string;
    inboundGateArrival: null;
    outboundGateDeparture: null;
    flightPosition: null;
    isReportable: boolean;
    transactions: Transaction[];
    flightStatusColor: null;
    id: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    restoredAt: null;
    createdBy: number;
    updatedBy: number;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isRevisionable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: string;
    fileFormats: null;
}

export interface Transaction {
    work_order_id: number;
    workOrder: null;
    contract_line_id: number | null;
    contractLine: null;
    product_id: number;
    product: null;
    transaction_id: null;
    quantity: number;
    posted_at: null;
    dateTransaction: null;
    ammount: number;
    status: number;
    id: number;
    created_at: null;
    updated_at: null;
    deleted_at: null;
    restored_at: null;
    created_by: null;
    updated_by: null;
    deleted_by: null;
    restored_by: null;
    external_id: null;
    options: null;
    is_revisionable: boolean;
    is_reportable: boolean;
    force_delete: boolean;
    dynamic_parameters: DynamicParameters;
    default_include: string;
    searchable_fields: string;
    file_formats: null;
}

export interface DynamicParameters {
}

export interface Meta {
    page: Page;
}

export interface Page {
    total: number;
    HasNextPage: boolean;
    HasPreviousPage: boolean;
    currentPage: number;
    perPage: number;
}
