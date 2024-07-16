<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import expansionForm from "./expansionForm.vue";
import serviceListController from "./controllers/serviceList";

export default defineComponent({
  components: {
    expansionForm,
    chipServices: defineAsyncComponent(() => import('./chipServices.vue'))
  },
  setup() {
    return {
      ...serviceListController(),
    };
  },
});
</script>
<template>
  <div class="
      service-list-ctn
      tw-mx-3
      tw-p-4
      tw-mb-12
      tw-overflow-auto
      tw-rounded-lg
    ">
    <section class="tw-w-full tw-flex tw-items-center">
      <q-breadcrumbs class="
          tw-flex-none
          tw-text-base
          md:tw-text-xl
          max-width-breadcrumbs
          breadcrumbs-color-text
        ">
        <q-breadcrumbs-el label="Services" @click="setBreadcrumbs(null)" class="
            tw-cursor-pointer
            tw-text-base
            md:tw-text-xl
            tw-font-extrabold
            tw-text-blue-700
            breadcrumbs-color-text-services
          " />
        <q-breadcrumbs-el v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" :label="breadcrumb.title"
          @click="setBreadcrumbs(breadcrumb, index)" :class="{ 'tw-cursor-pointer': index + 1 !== breadcrumbs.length }"
          class="tw-text-base md:tw-text-xl breadcrumbs-color-text" />
      </q-breadcrumbs>
      <hr class="tw-flex-grow tw-mx-2" />
      <div class="tw-flex-none">
        <chipServices @search="(value) => search = value" />
      </div>
    </section>
    <div v-if="errorList.length > 0" class="
          tw-py-2
          tw-text-base
          tw-border
          tw-border-gray-100
          tw-font-semibold
          tw-px-3
          tw-rounded-lg
          tw-text-red-800
          tw-mt-5
          tw-bg-red-200
        ">
      There are some services with mandatory fields, please check.
    </div>
    <div class="tw-py-5">
      <inner-loading :visible="loading" />
      <q-input v-if="!selectService.component && errorList.length === 0" borderless standout dense color="primary"
        input-class="tw-p-0 tw-text-base color-input" placeholder="What are you looking for?" class="
            tw-mb-6
            search
            search-service-list
            tw-text-blue-900
            tw-max-w-full
          " v-model="search" clearable>
        <template v-slot:prepend>
          <i class="fa-light fa-magnifying-glass"></i>
        </template>
      </q-input>
      <ul v-if="filterService.lists.length > 0" class="tw-rounded-lg tw-border tw-px-4 border-color">
        <li v-for="(service, index) in filterService.lists" :key="service.id" class="
              tw-list-none
              tw-cursor-pointer,
            " @click="setBreadcrumbs(service)">
          <div class="
              tw-flex tw-w-full
              tw-items-center
              tw-font-semibold
              tw-text-gray-500
              tw-py-2.5
              tw-px-3.5
              tw-my-2
              tw-rounded-lg
              tw-cursor-pointer
              service-list-item
            ">
            <span class="tw-w-11/12 tw-font-normal list-text-color">
              {{ service.title }}
            </span>
            <div class="tw-w-1/6 tw-text-right">
              <i class="
                  fa-light fa-angle-right
                  tw-font-black tw-text
                  tw-text-lg color-icon
                " />
            </div>
          </div>
          <q-separator v-if="index < filterService.lists.length - 1" class="hr-bg-color" />
        </li>
      </ul>
      <expansionForm v-if="!loading && filterService.dynamicField.length > 0" :data="filterService.dynamicField" />
      <component v-if="selectService.component" :is="selectService.component" />
      <div v-if="filterService.lists.length === 0
          && filterService.dynamicField.length === 0" class="tw-text-center tw-text-gray-600 tw-text-xl tw-pb-12">
        <i class="fa-light fa-triangle-exclamation"></i>
        No data available
      </div>
    </div>
  </div>
</template>
<style>
.service-list-ctn .q-item {
  @apply tw-min-h-0 tw-py-3 tw-my-2;
}

.service-list-ctn .q-item:hover {
  @apply tw-rounded-lg tw-bg-gray-100;
}

.service-list-ctn .search-service-list {
  @apply tw-px-4;
}

.service-list-ctn .q-list--bordered {
  @apply tw-border-0;
}

.service-list-ctn .search {
  @apply tw-rounded-full;
  box-shadow: 1px 1px 1px 0px #4C5D9433 inset;
  background-color: #F1F4FA;
}

.color-input {
  color: #4C5D94;
}

.breadcrumbs-color-text-services {
  color: #28489A;
}

.max-width-breadcrumbs {
  max-width: 144px;
}

@media (min-width: 480px) {
  .max-width-breadcrumbs {
    max-width: 100%;
  }
}

.breadcrumbs-color-text {
  color: #8A98C3;
}

.list-text-color {
  color: #1F294F;
}

.service-list-item:hover {
  background-color: #F1F4FA;
}

.border-color {
  border-color: #000D4726;
}

.hr-bg-color {
  background-color: #D3DAEC;
}

.color-icon {
  color: #4C5D94;
}
</style>
