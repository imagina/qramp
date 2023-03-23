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

export interface State {
    operationTypeList: OperationType[];
    stationList: StationContract[];
    customerList: CustomerContract[];
    contractList: Contract[];
    flightStatusesList: FlightStatusContract[];
    workOrderStatusesList: WorkOrderStatusesContract[];
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
}

const state = reactive<State>({
    operationTypeList: [],
    stationList: [],
    customerList: [],
    contractList: [],
    flightStatusesList: [],
    workOrderStatusesList: [],
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
     * The function getAllList() returns a Promise that resolves to void.
     */
    async function getAllList(): Promise<void> {
        await Promise.all([
            getStation(),
            getOperationType(),
            getCustomer(),
            getContract(),
            getFlightStatuses(),
            getWorkOrderStatuses(),
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
    }
}