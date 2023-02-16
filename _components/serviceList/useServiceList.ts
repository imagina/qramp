import { ref, computed } from 'vue';
import serviceListStore, { ServiceModelContract } from "./store/serviceList";
export default function useServiceList(props = {}, emit = null) {
  const loading = computed(() => serviceListStore().getLoading());
  const serviceListModel = computed(() => serviceListStore().getServiceList());
  const search = ref<string>("");
  const selectService = ref<ServiceModelContract>({});
  const breadcrumbs = ref<any[]>([]);
  const showServiceList = computed(() =>
    !loading.value &&
    !selectService.value.component &&
    !selectService.value.dynamicField &&
    filterService.value.length > 0);
  const showNoData = computed(() => !loading.value &&
    !selectService.value.component &&
    filterService.value.length === 0);
  /**
   *
   * @returns  the list of services
  */
  const services = computed<ServiceModelContract | any>(() => {
    if (breadcrumbs.value.length === 0) {
      const service = serviceListModel.value.find(
        (item) => item.id === selectService.value.id
      );
      if (service) {
        return service.lists;
      }
      return serviceListModel.value;
    }
    if (selectService.value.lists) {
      return selectService.value.lists;
    }
    return selectService.value.dynamicField;
  });
  /**
   *
   * @param service - Selected service
   * @param index - Service position
   *
   * @returns BREAD CRUMBS SELECTED AS THE ARRANGEMENT TYPE 
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
  /**
   * @returns  FILTERED LIST OF SERVICES 
  */
  const filterService = computed<ServiceModelContract | any>(() => {
    if (search.value !== "") {
      return services.value.filter((item) =>
        item.title.toLowerCase().includes(search.value.toLowerCase())
      );
    }
    return services.value;
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
    showServiceList,
    showNoData,
  };
}