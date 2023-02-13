<template>
  <div 
    class="
     service-list-ctn 
     tw-mx-3
     tw-p-4 
     tw-mb-12
     tw-overflow-auto
     tw-shadow-lg
     tw-rounded-lg
     tw-border-t
     tw-border-gray-100"
    >
    <q-breadcrumbs>
      <q-breadcrumbs-el 
        icon="widgets" 
        label="WorkOrders" 
        @click="setBreadcrumbs(null)" 
        class="tw-cursor-pointer tw-text-blue-900"
      />
      <q-breadcrumbs-el
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.id"
        :label="breadcrumb.title"
        @click="setBreadcrumbs(breadcrumb, index)"
        :class="{'tw-cursor-pointer':  index + 1 !== breadcrumbs.length }"
      />
    </q-breadcrumbs>
    <div class="tw-py-6">
      <q-list
        v-if="!selectService.dynamicField && services.length > 0"
        bordered separator
       >
        <q-item
          v-for="service in services"
          :key="service.id"
          clickable
          v-ripple
          class="tw-py-4"
          @click.native="setBreadcrumbs(service)"
        >
          <div class="tw-flex tw-w-full tw-font-semibold tw-text-gray-500">
            <div class="tw-w-11/12">
              {{ service.title }}
            </div>
            <div class="tw-w-1/6 tw-text-right">
              <i class="fa-light fa-angle-right tw-font-semibold"></i>
            </div>
          </div>
        </q-item>
      </q-list>
      <expansionComponent v-else :data="services" />
      <div 
        v-if="services.length === 0"
        class="
         tw-text-center 
         tw-text-gray-600 
         tw-text-xl"
       >
        <i class="fa-light fa-triangle-exclamation"></i>
        No data available
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import serviceListModel, { ServiceModelContract } from "./models/serviceList";
import expansionComponent from '../expansionComponent.vue';

export default defineComponent({
  components: {
    expansionComponent,
  },
  setup() {
    const selectService = ref<ServiceModelContract>({});
    const breadcrumbs = ref<any[]>([]);
    const services = computed<ServiceModelContract | any>(() => {
        if(breadcrumbs.value.length === 0) {
            const service = serviceListModel.find(item => item.id === selectService.value.id);
            if(service) {
                return service.lists;
            }
            return serviceListModel;
        }
        if(selectService.value.lists)
        {
            return selectService.value.lists;
        }
        return selectService.value.dynamicField;
    });
    const setBreadcrumbs = (item: ServiceModelContract | null, index: null | number = null): void => {
        if(!item) {
            selectService.value = {};
            breadcrumbs.value = [];
            return;
        }
        const service = item;
        selectService.value = item;
        if(index !== null) {
            breadcrumbs.value = breadcrumbs.value.filter((breadcrumb, indexBr) => indexBr <= index);
            return;
        }
        breadcrumbs.value.push(service);
    }
    return {
      serviceListModel,
      breadcrumbs,
      selectService,
      setBreadcrumbs,
      services,
    };
  },
});
</script>

<style>
.service-list-ctn .q-item {
  @apply tw-min-h-0;
}
.service-list-ctn .q-list--bordered {
  @apply tw-border-0;
}
</style>
