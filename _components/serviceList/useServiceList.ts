import { ref, computed, shallowRef } from 'vue';
import serviceListStore from "./store/serviceList";
import { ServiceModelContract } from './contracts/index.contract';
import { i18n } from 'src/plugins/utils'

/**
 * @param props - This is an object that contains the props that are passed to the component.
 * @param [emit=null] - This is a function that is used to emit an event.
 * @returns The useServiceList function is returning an object that contains the following properties:
 * serviceListModel, breadcrumbs, selectService, setBreadcrumbs, services, filterService, search,
 * loading,
 * showServiceList, and showNoData.
 */
export default function useServiceList(props = {}, emit = null) {
    /**
     * @constant {boolean} loading
     * @constant {ServiceModelContract[]} serviceListModel - computed
     * @constant {ServiceModelContract} selectService - computed
     * @constant {ServiceModelContract} breadcrumbs - ref
     * @constant {string} search - ref
     * @constant {boolean} showServiceList - computed
     * @constant {boolean} showNoData - computed
     * @constant {any} trans - computed
     * component variable list
     */
    const trans = computed((): any => i18n.tr);
    const loading = computed((): Boolean => serviceListStore().getLoading());
    const serviceListModel = computed((): ServiceModelContract[] =>
        serviceListStore().getServiceList()
    );
    const search = ref<string>("");
    const selectService = shallowRef<ServiceModelContract>({});
    const breadcrumbs = ref<ServiceModelContract[]>([]);
    const showNoData = computed(
        (): boolean =>
            !loading.value &&
            !selectService.value.component &&
            filterService.value
            && filterService.value.length === 0
    );
    /* This is a computed property that returns a list of services. */
    const services = computed<ServiceModelContract | any>(() => {
        if (breadcrumbs.value.length === 0) {
            const service = serviceListModel.value.find(
                (item) => item.id === selectService.value.id
            );
            if (service) {
                return { dynamicField: [], lists: service.lists || [] };
            }
            return { dynamicField: [], lists: serviceListModel.value };
        }

        if (selectService.value.lists &&
            selectService.value.lists.length > 0 &&
            selectService.value.dynamicField &&
            selectService.value.dynamicField.length > 0) {
            return { dynamicField: selectService.value.dynamicField, lists: selectService.value.lists };
        }
        if (selectService.value.lists &&
            selectService.value.lists.length > 0 &&
            !selectService.value.dynamicField) {
            return { dynamicField: [], lists: selectService.value.lists };
        }
        if (selectService.value.lists &&
            selectService.value.lists.length === 0 &&
            selectService.value.dynamicField &&
            selectService.value.dynamicField.length > 0) {
            return { dynamicField: selectService.value.dynamicField, lists: [] };
        }

        // Si no hay ni listas ni campos dinámicos, devuelve un objeto con ambos campos como arrays vacíos
        return { dynamicField: [], lists: [] };
    });
    /**
     * If the service is null, then set the selectService.value to an empty object, and set the
     * breadcrumbs.value to an empty array. If the service is not null, then set the selectService.value
     * to the service, and if the index is not null, then filter the breadcrumbs.value to only include
     * breadcrumbs that have an index less than or equal to the index. If the index is null, then push
     * the service to the breadcrumbs.value.
     * @param {ServiceModelContract | null} service - ServiceModelContract | null,
     * @param {null | number} [index=null] - null | number = null
     * @returns BREAD CRUMBS SELECTED AS THE ARRANGEMENT TYPE.
     */
    const setBreadcrumbs = (
        service: ServiceModelContract | null,
        index: null | number = null
    ): void => {
        search.value = '';
        if (!service) {
            selectService.value = {};
            breadcrumbs.value = [];
            return;
        }
        selectService.value = service;
        if (index !== null) {
            breadcrumbs.value = breadcrumbs.value.filter(
                (breadcrumb, indexBr) => indexBr <= index
            );
            return;
        }
        breadcrumbs.value.push(service);
    };
    /* Filtering the list of services. */
    const filterService = computed<ServiceModelContract | any>(() => {
        const filteredServices = services.value;

        if (search.value !== "") {
            const filteredLists = filteredServices.lists.filter((listItem) =>
                listItem.title.toLowerCase().includes(search.value.toLowerCase())
            );

            const filteredDynamicFields = filteredServices.dynamicField.filter((dynamicItem) =>
                dynamicItem.title.toLowerCase().includes(search.value.toLowerCase())
            );

            return {
                dynamicField: filteredDynamicFields,
                lists: filteredLists
            };
        }

        return filteredServices;
    });
    return {
        serviceListModel,
        breadcrumbs,
        selectService,
        setBreadcrumbs,
        services,
        filterService,
        search,
        loading,
        showNoData,
        trans,
    };
}
