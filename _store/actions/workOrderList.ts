import { reactive } from 'vue';
import baseService from '@imagina/qcrud/_services/baseService.js'
import qRampStore from '../qRampStore.js'
import { COMPANY_PASSENGER, COMPANY_RAMP } from '../../_components/model/constants.js';

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
    stationList: any[];
    customerList: any[];
    contractList: any[];
    flightStatusesList: any[];
    workOrderStatusesList: any[];
}

export interface WorkOrderList {
    setOperationTypeList: (data: OperationType[]) => void;
    getOperationTypeList: () => OperationType[];
    setStationList: (data: any[]) => void;
    getStationList: () => any[];
    getOperationType: () => Promise<OperationType[] | void>;
    getStation: () => Promise<any[] | void>;
    setCustomerList: (data: any[]) => void;
    getCustomerList: () => any[];
    getCustomer: () => Promise<any[] | void>;
    getAllList: () => void;
    setContractList: (data: any[]) => void;
    getContractList: () => any[];
    setFlightStatusesList: (data: any[]) => void;
    getFlightStatusesList: () => any[];
    setWorkOrderStatusesList: (data: any[]) => void;
    getWorkOrderStatusesList: ()  => any[];
    getWorkOrderStatuses: ()  => void;
}

const state = reactive<State>({
    operationTypeList: [],
    stationList: [],
    customerList: [],
    contractList: [],
    flightStatusesList: [],
    workOrderStatusesList: [],
});


export default function workOrderList(): WorkOrderList {
    function setOperationTypeList(data: OperationType[]): void {
        state.operationTypeList = data;
    }
    function getOperationTypeList(): OperationType[] {
        return state.operationTypeList;
    }
    function setStationList(data: any[]): void {
        state.stationList = data;
    }
    function getStationList(): any[] {
        return state.stationList;
    }

    function setCustomerList(data: any[]): void {
        state.customerList = data;
    }
    function getCustomerList(): any[] {
        return state.customerList;
    }

    function setContractList(data: any[]): void {
        state.contractList = data;
    }
    function getContractList(): any[] {
        return state.contractList;
    }

    function setFlightStatusesList(data: any[]): void {
        state.contractList = data;
    }
    function getFlightStatusesList(): any[] {
        return state.contractList;
    }
    
    function setWorkOrderStatusesList(data: any[]): void {
        state.workOrderStatusesList = data;
    }
    function getWorkOrderStatusesList(): any[] {
        return state.workOrderStatusesList;
    }
    
    // actions 
    async function getOperationType(): Promise<OperationType[] | void> {
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
            const response = await baseService.index('apiRoutes.qramp.operationTypes', params);
            const data = response.data.map(item => ({ label: item.operationName, ...item, value: item.id }))
            setOperationTypeList(data);
            return data; 
        } catch (error) {
            console.log(error);
        }
    }

    async function getStation(): Promise<any[] | void> {
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
            const response = await baseService.index('apiRoutes.qsetupagione.setupStations', params);
            const data = response.data;
            setStationList(data);
            return data; 
        } catch (error) {
            console.log(error);
        }
    }

    async function getCustomer(): Promise<any[] | void> {
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
            const response = await baseService.index('apiRoutes.qramp.setupCustomers', params);
            const data = response.data;
            setCustomerList(data);
            return data; 
        } catch (error) {
            console.log(error);
        }
    }

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

    async function getFlightStatuses(): Promise<any[] | void> {
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
            const response = await baseService.index('apiRoutes.qfly.flightStatuses', params);
            const data = response.data;
            setFlightStatusesList(data);
            return data; 
        } catch (error) {
            console.log(error);
        }
    }
    
    async function getWorkOrderStatuses(): Promise<any[] | void> {
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
            const response = await baseService.index('apiRoutes.qramp.workOrderStatuses', params);
            const data = response.data;
            setWorkOrderStatusesList(data);
            return data; 
        } catch (error) {
            console.log(error);
        }
    }
    

    async function getAllList() : Promise<void> {
        await Promise.all([
            getStation(),
            getOperationType(),
            getCustomer(),
            //getContract(),
            getFlightStatuses(),
            getWorkOrderStatuses(),
        ]);
    }

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