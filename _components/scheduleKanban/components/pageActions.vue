<template>
  <div
    id="pageActionscomponent"
    class="row q-col-gutter-y-sm full-width items-center justify-between"
  >
    
    <!--Actions-->
    <div
      :class="`actions-content row q-gutter-${gutter} items-center justify-end items-start`"
    >
      <!--Search-->
      <q-input
        v-model="search"
        bg-color="white"
        debounce="800"
        rounded
        outlined
        dense
        clearable
        :placeholder="$tr('isite.cms.label.search')"
        class="page-input-search"
        v-if="extraActions && extraActions.includes('search') && searchAction"
        @input="$emit('search', $clone(search))"
      >
        <template v-slot:prepend>
          <q-icon
            color="tertiary"
            size="xs"
            name="fa-duotone fa-magnifying-glass"
          />
        </template>
      </q-input>
      <!--Button Actions-->
      <div v-for="(btn, keyAction) in actions" :key="keyAction">
        <!-- if the button is dropdown -->
        <q-btn-dropdown
          split
          v-bind="{ ...buttonProps }"
          v-if="btn.type == 'btn-dropdown'"
          outline
        >
          <template v-slot:label>
            <div
              class="row items-center no-wrap"
              @click="refreshByTime(timeRefresh)"
            >
              <q-icon left :name="btn.props.icon" />
              <div class="text-center" v-if="multipleRefresh">
                {{ titleRefresh }}
              </div>
            </div>
          </template>
          <q-list>
            <q-item
              v-for="(item, index) in btn.items"
              :key="index"
              clickable
              v-close-popup
              @click="item.action != undefined ? item.action() : null"
              class="tw-px-4"
            >
              <q-item-section avatar v-if="item.icon">
                <q-avatar :icon="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          v-else-if="btn.type === 'recommendation'"
          class="animated"
          v-bind="{ ...buttonProps, ...btn.props }"
          @click="btn.action != undefined ? btn.action() : null"
        >
          <q-tooltip v-if="btn.label">{{ btn.label }}</q-tooltip>
        </q-btn>
        <q-btn
          v-else
          v-bind="{ ...buttonProps, ...btn.props }"
          @click="btn.action != undefined ? btn.action() : null"
        >
          <q-tooltip v-if="btn.label">{{ btn.label }}</q-tooltip>
        </q-btn>
      </div>
    </div>
    <!--Description-->
    <div v-if="description" class="ellipsis-2-lines col-12 description-content">
      {{ description }}
    </div>
    <!--Filter data-->
    <div
      class="col-12 tw-mt-3"
      v-if="
        (filter.hasValues || Object.keys(quickFilters).length)
      "
    >
      <!--<q-separator class="q-mb-sm"/>-->
      <div class="text-blue-grey ellipsis text-caption items-center row">
        <q-icon
          name="fa-light fa-filter"
          class="q-mr-xs"
          color="amber"
          size="18px"
        />
        <b>{{ $trp("isite.cms.label.filter") }}:</b>
        <label
          v-for="(item, itemKey) in filter.readValues"
          :key="itemKey"
          v-if="item.value && item.label !== ''"
          class="q-ml-xs text-grey-7"
        >
          {{ item.label }} {{ item.value }},
        </label>
      </div>
      <!-- Quick Filters-->
      <div
        v-if="Object.keys(quickFilters).length"
        class="row q-col-gutter-md q-pt-sm"
      >
        <dynamic-field
          v-for="(field, keyField) in quickFilters"
          :key="keyField"
          :field="field"
          v-model="filterData[keyField]"
          :class="field.colClass"
          @input="emitFilter"
          :keyField="keyField"
        />
      </div>
    </div>
    <!-- Export Component -->
    <masterExport v-model="exportParams" ref="exportComponent" />
    <filters />
  </div>
</template>

<script>
import Vue, { defineComponent, ref, watch, onBeforeUnmount, computed } from "vue";
import masterExport from "@imagina/qsite/_components/master/masterExport";
import filters from './filters.vue';
import filtersStore from '../store/filters.store.ts';

export default defineComponent({
  props: {
    title: String,
    description: String,
    icon: String,
    gutter: { type: String, default: "sm" },
    size: { type: String, default: "small" },
    extraActions: Array,
    excludeActions: { default: false },
    searchAction: { default: true },
    multipleRefresh: { type: Boolean, default: false },
  },
  components: {
    masterExport,
    filters,
  },
  setup(props) {
    const exportComponent = ref(null);
    const exportParams = ref(false);
    const search = ref(null);
    const filterData = ref({});
    const refreshIntervalId = ref(null);
    const titleRefresh = ref(
      Vue.prototype.$tr("isite.cms.label.refreshAtOnce")
    );
    const timeRefresh = ref(0);

    const isAppOffline = ref(false);

    const buttonProps = computed(() => ({
      round: false,
      rounded: true,
      dense: true,
      unelevated: true,
      color: "primary",
      class: `btn-${props.size}`,
      outline: true,
      noCaps: true,
    }));

    const actions = computed(() => {
      let excludeActions = Vue.prototype.$clone(
        Array.isArray(props.excludeActions) ? props.excludeActions : []
      );

      let response = [
        //Export
        {
          label: Vue.prototype.$tr("isite.cms.label.export"),
          vIf: true,
          props: {
            icon: "fa-duotone fa-file-arrow-down",
          },
          action: () => {
            console.log(exportComponent);
            exportComponent.value.showReport()
         },
        },
        //Filter
        {
          label: Vue.prototype.$tr("isite.cms.label.filter"),
          vIf: true,
          props: {
            icon: "fa-duotone fa-filter",
            id: "filter-button-crud",
          },
          action: () => filtersStore.showModal = true,
        },
        //Refresh
        {
          label: Vue.prototype.$trp("isite.cms.label.refresh"),
          type: props.multipleRefresh ? "btn-dropdown" : "",
          vIf:
            !excludeActions.includes("refresh"),
          props: {
            icon: "fa-duotone fa-rotate-right",
            id: "refresh-button-crud",
          },
          items: [
            {
              label: Vue.prototype.$tr("isite.cms.label.refreshAtOnce"),
              action: () => refreshByTime(0),
            },
            {
              label: Vue.prototype.$tr("isite.cms.label.refreshEveryMinutes", {
                min: 1,
              }),
              action: () => refreshByTime(1),
            },
            {
              label: Vue.prototype.$tr("isite.cms.label.refreshEveryMinutes", {
                min: 5,
              }),
              action: () => refreshByTime(5),
            },
            {
              label: Vue.prototype.$tr("isite.cms.label.refreshEveryMinutes", {
                min: 10,
              }),
              action: () => refreshByTime(10),
            },
            {
              label: Vue.prototype.$tr("isite.cms.label.refreshEveryMinutes", {
                min: 15,
              }),
              action: () => refreshByTime(5),
            },
          ],
          action: emitRefresh,
        },
      ];
      
      if (props.extraActions) {
        //Prepend actions
        response = [...props.extraActions.filter(action => typeof action != 'string'), ...response]
      }
      //Response
      return response.filter((item) =>
        item.vIf !== undefined ? item.vIf : true
      );
    });
    const filter = computed(() => {
      return {}
    })
    const quickFilters = computed(() => {
      var response = {}
      //Get quick filters
      /*if (this.$q.platform.is.desktop) {
        Object.keys(this.filter.fields).forEach(fieldName => {
          var fieldfilter = this.filter.fields[fieldName]
          if (fieldfilter.quickFilter) {
            response[fieldName] = {
              ...fieldfilter,
              colClass: "col-12 col-md-4 col-xl-3"
            }
            if (!this.filterData[fieldName]) this.$set(this.filterData, fieldName, fieldfilter.value || null)
          }
        })
      }*/
      //Response
      return response
    });

    const pageDocumentation = computed(() => {
      let response = null
      //Get params from page permission
      /*let params = this.$helper.getInfoFromPermission(this.$route.meta.permission)
      if (params) {
        //instance the config name
        let configName = `${params.module}.documentation.${params.entity}`
        //Search the config
        response = this.$store.getters['qsiteApp/getConfigApp'](configName)
      }*/
      //Response
      return !response ? null : {
        title: props.title,
        description: response,
        icon: this.$route.meta.icon,
        class: 'q-ml-sm'
      }
    })
    // Methods...
    function init() {
      // Init logic...
    }

    function refreshByTime(time) {
      timeRefresh.value = time;
      titleRefresh.value = time === 0
          ? Vue.prototype.$tr('isite.cms.label.refreshAtOnce')
          : Vue.prototype.$tr('isite.cms.label.refreshEveryMinutes', {min: time});
      clearInterval();
      const interval = 1000 * 60 * time;
      emitRefresh();
      if (time > 0) {
        refreshIntervalId.value = setInterval(() => {
          emitRefresh();
        }, interval);
      }
    }

    function emitRefresh() {
      // Emit refresh logic...
    }

    function emitFilter() {
      // Emit filter logic...
    }

    function clearInterval() {
        if (refreshIntervalId.value) {
            clearInterval(refreshIntervalId.value);
            refreshIntervalId.value = null;
        }
    }

    onBeforeUnmount(() => {
      clearInterval();
    });

    return {
      exportParams,
      search,
      filterData,
      refreshIntervalId,
      titleRefresh,
      timeRefresh,
      isAppOffline,
      buttonProps,
      actions,
      quickFilters,
      init,
      refreshByTime,
      emitRefresh,
      emitFilter,
      clearInterval,
      pageDocumentation,
      filter,
      exportComponent,
    };
  },
});
</script>

<style lang="stylus"></style>
