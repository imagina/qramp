import { reactive } from 'vue';
import baseService from '@imagina/qcrud/_services/baseService.js'
import qRampStore from '../qRampStore.js'
import { COMPANY_PASSENGER, COMPANY_RAMP } from '../../_components/model/constants.js';


export interface CustomerContract {
    customerName: string;
    workdayId: string;
    customerStatusId: number;
    customerStatus: any;
    customerTypeId: any;
    customerType: any;
    parentCustomerId: any;
    airlineId: any;
    airline: any;
    adHocWorkOrders: boolean;
    contracts: any;
    oldId: any;
    id: number;
    createdAt: any;
    updatedAt: any;
    deletedAt: any;
    restoredAt: any;
    createdBy: any;
    updatedBy: any;
    deletedBy: any;
    restoredBy: any;
    externalId: any;
    options: any;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: SearchableFields;
    fileFormats: any;
}
export interface StationContract {
    airportId: number | null;
    airport: null;
    companyId: number;
    company: null;
    buildings: null;
    gates: null;
    areas: null;
    fullName: string;
    stationName: string;
    stationCode: string;
    oldId: number | null;
    id: number;
    createdAt: null | string;
    updatedAt: null | string;
    deletedAt: null;
    restoredAt: null;
    createdBy: number | null;
    updatedBy: number | null;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: SearchableFields;
    fileFormats: null;
}

export interface FlightStatusContract {
    name: string;
    color: string;
    id: number;
    createdAt: null;
    updatedAt: string;
    deletedAt: null;
    restoredAt: null;
    createdBy: null;
    updatedBy: number;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: string;
    fileFormats: null;
}

export interface WorkOrderStatusesContract {
    statusName: string;
    color: string;
    id: number;
    createdAt: null;
    updatedAt: string;
    deletedAt: null;
    restoredAt: null;
    createdBy: null;
    updatedBy: number;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: string;
    fileFormats: null;
}

export interface Contract {
    contractName: null | string;
    contractDescription: null;
    workdayId: string;
    worktag: null;
    contractSignedDate: string;
    contractEffectiveDate: string;
    readyToPostWd: null;
    oneClickPost: null;
    flightSchedules: any[];
    contractLines: null;
    contractRules: null;
    contractTypeId: number | null;
    contractType: null;
    contractStatusId: number;
    contractStatus: null;
    customerId: number;
    customer: CustomerContract;
    customerName: string;
    buildingId: number;
    building: null;
    costCenterId: number;
    costCenter: null;
    businessUnitId: number;
    businessUnit: null;
    companyId: number;
    company: null;
    oldId: null;
    id: number;
    createdAt: null;
    updatedAt: null;
    deletedAt: null;
    restoredAt: null;
    createdBy: null;
    updatedBy: null;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: DefaultInclude;
    searchableFields: string;
    fileFormats: null;
}

export enum DefaultInclude {
    Customer = "customer",
}

export enum SearchableFields {
    IDCustomerNameWorkdayID = "id,customer_name,workday_id",
}
export interface Options {
    type: string;
}

export interface OperationType {
    operationName: string;
    companyId: number;
    company?: number;
    id: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    restoredAt?: string;
    createdBy?: any;
    updatedBy?: any;
    deletedBy?: any;
    restoredBy?: any;
    externalId?: number;
    options: Options;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: string;
    fileFormats?: any;
    label: string,
    value: string | number;
}
export interface Gates {
    stationId: number;
    station: null;
    areaId: number;
    area: null;
    name: string;
    id: number;
    createdAt: null;
    updatedAt: null;
    deletedAt: null;
    restoredAt: null;
    createdBy: null;
    updatedBy: null;
    deletedBy: null;
    restoredBy: null;
    externalId: null;
    options: null;
    isReportable: boolean;
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: SearchableFields;
    fileFormats: null;
}

export enum SearchableFields {
    IDName = "id,name",
}

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
    inboundOriginAirportId: number;
    inboundOriginAirport: null;
    outboundDestinationAirportId: number;
    outboundDestinationAirport: null;
    contractId: number;
    contract: null;
    responsibleId: number;
    responsible: Responsible;
    flightStatusId: number;
    flightStatus: null;
    scheduleStatusId: null;
    scheduleStatus: null;
    workOrderItems: any[];
    gateId: number;
    gate: null;
    companyId: number;
    company: null;
    adHoc: boolean;
    customCustomer: boolean;
    inboundCustomFlightNumber: null;
    needToBePosted: boolean;
    customCustomerName: null;
    remark: string;
    delay: any[];
    safetyMessage: string;
    customerSignature: string;
    customerName: string;
    customerTitle: string;
    representativeSignature: string;
    representativeName: string;
    representativeTitle: string;
    date: null;
    referenceId: string;
    inboundFlightNumber: string;
    inboundTailNumber: string;
    inboundScheduledArrival: string;
    inboundBlockIn: string;
    estimatedOnUtc: null;
    inboundCargoTotalUldsUnloaded: null;
    inboundCargoBulkUnloaded: null;
    outboundFlightNumber: string;
    outboundTailNumber: string;
    outboundScheduledDeparture: string;
    outboundBlockOut: string;
    estimatedOffUtc: null;
    calendarTitle: string;
    outboundCustomFlightNumber: null;
    outboundCargoTotalUldsLoaded: null;
    outboundCargoBulkLoaded: null;
    cargoTotalKilosLoaded: null;
    cargoTotalKilosUnloaded: null;
    preFlightNumber: string;
    faFlightId: string;
    faFlightStatus: null;
    comments: number;
    sta: string;
    std: string;
    flightPosition: null;
    isReportable: boolean;
    transactions: Transaction[];
    flightStatusColor: null;
    id: number;
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
    forceDelete: boolean;
    defaultInclude: string;
    searchableFields: string;
    fileFormats: null;
}

export interface Responsible {
    email: string;
    password: string;
    permissions: { [key: string]: boolean };
    allSettings: AllPermissions;
    socialData: AllPermissions;
    defaultInclude: string;
    allPermissions: AllPermissions;
    lastLogin: string;
    fullName: string;
    firstName: string;
    lastName: string;
    timezone: null;
    language: null;
    createdBy: null;
    updatedBy: null;
    deletedBy: null;
    externalGuid: null;
    roles: any[];
    departments: any[];
    folders: null;
    reports: null;
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    restoredAt: null;
    restoredBy: null;
    externalId: null;
    options: Options;
    isReportable: boolean;
    forceDelete: boolean;
    searchableFields: string;
    fileFormats: null;
}

export interface AllPermissions {
}

export interface Options {
    buildingsAssigned: any[];
    businessUnitType: string;
    stationsAssigned: any[];
    companyAssigned: null;
}

export interface Transaction {
    work_order_id: number;
    workOrder: null;
    contract_line_id: null;
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
    is_reportable: boolean;
    force_delete: boolean;
    dynamic_parameters: AllPermissions;
    default_include: string;
    searchable_fields: string;
    file_formats: null;
}

export interface Meta {
    page: Page;
}

export interface Page {
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    perPage: number;
}

export interface State {
    operationTypeList: OperationType[];
    stationList: StationContract[];
    customerList: CustomerContract[];
    contractList: Contract[];
    flightStatusesList: FlightStatusContract[];
    workOrderStatusesList: WorkOrderStatusesContract[];
    gatesList: Gates[];
    workOrderList: WorkOrders;
}

export interface WorkOrderList {
    setOperationTypeList: (data: OperationType[]) => void;
    getOperationTypeList: () => OperationType[];
    setStationList: (data: StationContract[]) => void;
    getStationList: () => StationContract[];
    getOperationType: () => Promise<OperationType[] | void>;
    getStation: () => Promise<StationContract[] | void>;
    setCustomerList: (data: CustomerContract[]) => void;
    getCustomerList: () => CustomerContract[];
    getCustomer: () => Promise<CustomerContract[] | void>;
    getAllList: () => Promise<void>;
    setContractList: (data: Contract[]) => void;
    getContractList: () => Contract[];
    setFlightStatusesList: (data: FlightStatusContract[]) => void;
    getFlightStatusesList: () => FlightStatusContract[];
    setWorkOrderStatusesList: (data: WorkOrderStatusesContract[]) => void;
    getWorkOrderStatusesList: () => WorkOrderStatusesContract[];
    getWorkOrderStatuses: () => void;
    getGatesList: () => Gates[];
    setGatesList: (data: Gates[]) => void;
    getGates: () => Promise<Gates[] | void>;
    getDataWorkOrderList: () => WorkOrders;
    setDataWorkOrderList: (data: WorkOrders) => void;
    getWorkOrders: () => Promise<WorkOrders | void>;
}

const state = reactive<State>({
    operationTypeList: [],
    stationList: [],
    customerList: [],
    contractList: [],
    flightStatusesList: [],
    workOrderStatusesList: [],
    gatesList: [],
    /* Creating a new array called workOrderList and assigning it to the variable workOrderList. */
    workOrderList: {
        data: [],
        meta: {
            page: {
                total: 0,
                hasNextPage: false,
                hasPreviousPage: false,
                currentPage: 1,
                perPage: 1,
            },
        }
    },
});
const cacheTimeForm24Hour: number = 60 * 60 * 24;
const cacheTimeForThirtyDays: number = cacheTimeForm24Hour * 30;

/**
 * This is a work order list function that returns an object with several functions to
 * interact with OperationType, StationContract, CustomerContract, Contract, 
 * FlightStatusContract, and WorkOrderStatusesContract.
 * @returns {WorkOrderList} A WorkOrderList object.
*/
export default function workOrderList(): WorkOrderList {
    /**
     * This function returns the workOrderList property of the state object.
     * @returns the state.workOrderList.
     */
    
    function getDataWorkOrderList(): WorkOrders {
        return state.workOrderList;
    }

    /**
     * This function takes a parameter of type WorkOrders and sets the state.workOrderList to the value
     * of the parameter.
     * @param {WorkOrders} data - WorkOrders
     */
    function setDataWorkOrderList(data: WorkOrders): void {
        state.workOrderList = data;
    }
    /**
     * This function takes an array of OperationType objects and assigns it to the operationTypeList
     * property of the state object.
     * @param {OperationType[]} data - OperationType[] - this is the data that is being passed in from
     * the component.
     */

    function setOperationTypeList(data: OperationType[]): void {
        state.operationTypeList = data;
    }
    /**
     * It returns a list of OperationType objects.
     * @returns The operationTypeList array.
     */
    function getOperationTypeList(): OperationType[] {
        return state.operationTypeList;
    }
    /**
     * This function takes an array of StationContract objects and assigns it to the stationList
     * property of the state object.
     * @param {StationContract[]} data - StationContract[]
     */
    function setStationList(data: StationContract[]): void {
        state.stationList = data;
    }
    /**
     * This function returns an array of StationContract objects.
     * @returns The stationList array.
     */
    function getStationList(): StationContract[] {
        return state.stationList;
    }

    /**
     * This function takes an array of CustomerContract objects and assigns it to the customerList
     * property of the state object.
     * @param {CustomerContract[]} data - CustomerContract[] - This is the data that is being passed
     * in.
     */
    function setCustomerList(data: CustomerContract[]): void {
        state.customerList = data;
    }
    /**
     * This function returns an array of CustomerContract objects.
     * @returns An array of CustomerContract objects.
     */
    function getCustomerList(): CustomerContract[] {
        return state.customerList;
    }

    /**
     * This function takes an array of Contract objects and assigns it to the contractList property of
     * the state object.
     * @param {Contract[]} data - Contract[]
     */
    function setContractList(data: Contract[]): void {
        state.contractList = data;
    }
    /**
     * The function getContractList returns an array of Contract objects.
     * @returns The contractList array.
     */
    function getContractList(): Contract[] {
        return state.contractList;
    }

    /**
     * This function takes an array of FlightStatusContract objects and assigns it to the
     * flightStatusesList property of the state object.
     * @param {FlightStatusContract[]} data - FlightStatusContract[]
     */
    function setFlightStatusesList(data: FlightStatusContract[]): void {
        state.flightStatusesList = data;
    }
    /**
     * It returns a list of FlightStatusContract objects.
     * @returns the value of the state.flightStatusesList property.
     */
    function getFlightStatusesList(): FlightStatusContract[] {
        return state.flightStatusesList;
    }

    /**
     * This function takes an array of WorkOrderStatusesContract objects and sets the
     * state.workOrderStatusesList property to that array.
     * @param {WorkOrderStatusesContract[]} data - WorkOrderStatusesContract[]
     */
    function setWorkOrderStatusesList(data: WorkOrderStatusesContract[]): void {
        state.workOrderStatusesList = data;
    }
    /**
     * This function returns a list of work order statuses.
     * @returns An array of WorkOrderStatusesContract objects.
     */
    function getWorkOrderStatusesList(): WorkOrderStatusesContract[] {
        return state.workOrderStatusesList;
    }

    /**
     * This function takes an array of Gates objects and sets the gatesList property of the state
     * object to that array.
     * @param {Gates[]} data - Gates[] - this is the data that is being passed in from the API call.
     */
    function setGatesList(data: Gates[]): void {
        state.gatesList = data;
    }

    /**
     * The function getGatesList() returns an array of Gates objects.
     * @returns The gatesList array.
     */
    function getGatesList(): Gates[] {
        return state.gatesList;
    }

    // actions 
    /**
     * The function getOperationType() returns a Promise that resolves to an array of OperationType
     * objects or void.
     * @returns a Promise.
     */
    async function getOperationType(): Promise<OperationType[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qramp.operationTypes', params);
            const data = response.data.map(item => ({ label: item.operationName, ...item, value: item.id }))
            setOperationTypeList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This function is an async function that returns a promise of an array of StationContract objects
     * or void.
     * @returns a Promise.
     */
    async function getStation(): Promise<StationContract[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qsetupagione.setupStations', params);
            const data = response.data;
            setStationList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Requests a list of customers from the server based on user type.
     * @returns A promise that will resolve with the array of CustomerContract objects or void if there's an error
     */
    async function getCustomer(): Promise<CustomerContract[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForm24Hour,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qramp.setupCustomers', params);
            const data = response.data;
            setCustomerList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * The function getContract() is an async function that returns a promise of an array of any type
     * or void.
     * @returns The data is being returned as an array of objects.
     */
    async function getContract(): Promise<any[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qramp.setupContracts', params);
            const data = response.data;
            setContractList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This function gets the flight statuses from the server and sets the flight statuses list in the
     * store.
     * @returns a promise.
     */
    async function getFlightStatuses(): Promise<FlightStatusContract[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qfly.flightStatuses', params);
            const data = response.data;
            setFlightStatusesList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This function gets the work order statuses from the API and sets the work order statuses list in
     * the store.
     * @returns The data is being returned.
     */
    async function getWorkOrderStatuses(): Promise<WorkOrderStatusesContract[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qramp.workOrderStatuses', params);
            const data = response.data;
            setWorkOrderStatusesList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * "getGates() is an async function that returns a Promise of Gates[] or void"</code>
     * @returns The data is being returned as an array of objects.
     */
    async function getGates(): Promise<Gates[] | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                    }
                },
            }
            const response = await baseService.index('apiRoutes.qsetupagione.gates', params);
            const data = response.data;
            setGatesList(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This function is an async function that returns a promise of type WorkOrders or void. It calls a
     * function called baseService.index() which returns a promise of type WorkOrders. The function
     * then sets the dataWorkOrderList to the response and returns the data.
     * @returns The data is being returned as an array of objects.
     */
    async function getWorkOrders(): Promise<WorkOrders | void> {
        try {
            const isPassenger = qRampStore().getIsPassenger();
            const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
            const params = {
                cacheTime: cacheTimeForThirtyDays,
                params: {
                    filter: {
                        companyId,
                        order: {
                            field: "id",
                            way: "desc"
                        },
                        withoutDefaultInclude: true
                    },
                    take: 100
                },
            }
            const response = await baseService.index('apiRoutes.qramp.workOrders', params);
            const data = response;
            setDataWorkOrderList(response);
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * The function getAllList() returns a Promise that resolves to void.
     */
    async function getAllList(): Promise<void> {
        await Promise.all([
            getWorkOrders(),
            getStation(),
            getOperationType(),
            getCustomer(),
            getContract(),
            getFlightStatuses(),
            getWorkOrderStatuses(),
            getGates(),
        ]);
    }

    /**
   * This object consists of functions for getting and setting data for OperationType, 
   * StationContract, CustomerContract, Contract, FlightStatusContract, and WorkOrderStatusesContract.
   * @typedef {Object} WorkOrderList
   * @property {function(data: OperationType[]): void} setOperationTypeList - Assigns an array of 
   *    OperationType objects to the operationTypeList property of the state object.
   * @property {function(): OperationType[]} getOperationTypeList - Returns an array of 
   *    OperationType objects.
   * @property {async function(): Promise<OperationType[] | void>} getOperationType - Gets an
   *    array of OperationType objects.
   * @property {function(data: StationContract[]): void} setStationList - Assigns an array of 
   *    StationContract objects to the stationList property of the state object.
   * @property {function(): StationContract[]} getStationList - Returns an array of StationContract 
   *    objects.
   * @property {async function(): Promise<StationContract[] | void>} getStation - Gets an array of 
   *    StationContract objects.
   * @property {function(data: CustomerContract[]): void} setCustomerList - Assigns an array of 
   *    CustomerContract objects to the customerList property of the state object.
   * @property {function(): CustomerContract[]} getCustomerList - Returns an array of 
   *    CustomerContract objects.
   * @property {async function(): Promise<CustomerContract[] | void>} getCustomer - Gets an array of 
   *    CustomerContract objects.
   * @property {function(data: Contract[]): void} setContractList - Assigns an array of Contract 
   *    objects to the contractList property of the state object.
   * @property {function(): Contract[]} getContractList - Returns an array of Contract objects.
   * @property {async function(): Promise<any[] | void>} getContract - Gets an array of objects of any type.
   * @property {function(): FlightStatusContract[]} getFlightStatusesList - Returns a list of 
   *    FlightStatusContract objects.
   * @property {function(data: FlightStatusContract[]): void} setFlightStatusesList - Assigns an 
   *    array of FlightStatusContract objects to the flightStatusesList property of the state object.
   * @property {async function(): Promise<FlightStatusContract[] | void>} getFlightStatuses - Gets 
   *    an array of FlightStatusContract objects.
   * @property {function(): WorkOrderStatusesContract[]} getWorkOrderStatusesList - Returns 
   *    a list of work order statuses.
   * @property {function(data: WorkOrderStatusesContract[]): void} setWorkOrderStatusesList - 
   *    Assigns an array of WorkOrderStatusesContract objects to the workOrderStatusesList property 
   *    of the state object.
   * @property {async function(): Promise<WorkOrderStatusesContract[] | void>} getWorkOrderStatuses - 
   *    Gets an array of WorkOrderStatusesContract objects.
   * @property {async function(): Promise<void>} getAllList - Gets all the lists for 
   *    OperationType, StationContract, CustomerContract, Contract, FlightStatusContract, and 
   *    WorkOrderStatusesContract.
   */

    return {
        setOperationTypeList,
        getOperationTypeList,
        getOperationType,
        setStationList,
        getStationList,
        getStation,
        setCustomerList,
        getCustomerList,
        getCustomer,
        getAllList,
        setContractList,
        getContractList,
        getFlightStatusesList,
        setFlightStatusesList,
        getWorkOrderStatusesList,
        setWorkOrderStatusesList,
        getWorkOrderStatuses,
        getGatesList,
        setGatesList,
        getGates,
        getDataWorkOrderList,
        setDataWorkOrderList,
        getWorkOrders
    }
}