<script lang="ts">
import {defineComponent, computed, ref, onMounted, inject} from 'vue';
import serviceListStore from './store/serviceList';
import postFavourites from './services/postFavourites'
import deleteFavourites from './services/deleteFavourites'
import workOrderList from '../../_store/actions/workOrderList';
import storeFlight from '../flight/store';
import {alert, i18n, store, lodash} from 'src/plugins/utils';
import qRampStore from "../../_store/qRampStore";
import moment from "moment-timezone";

export default defineComponent({
  name: 'expansionComponent',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const refServiceList = ref(null);
    const indexMultiple = ref(null);
    const data: any = computed(() => props.data);
    const isDesktop = computed(() => (window as any).innerWidth >= '900');
    const isAppOffline = computed(() => store.state.qofflineMaster.isAppOffline);
    const dynamicRefs = ref({});
    const permissionFavourite: any = computed(() => ({
      create: store.hasAccess('ramp.favourites.create'),
      edit: store.hasAccess('ramp.favourites.edit'),
      index: store.hasAccess(`ramp.favourites.index`),
      destroy: store.hasAccess(`ramp.favourites.destroy`),
    }));
    async function selectFavourite(data: any) {
      data.favourite = !data.favourite;
      if (!data.favourite) {
        if (!permissionFavourite.value.destroy) return;
        const favoriteData = serviceListStore().getFavouriteList().find(item => item.productId === data.id);
        await deleteFavourites(favoriteData?.id);
        serviceListStore().removeFromFavouriteList(data.id);
        alert.success({message: `Favorite deleted successfully Product:${data.title}`});
      } else {
        if (!permissionFavourite.value.create) return;
        const {stationId, contractId, customerId, carrierId, operationTypeId} = storeFlight().getForm();
        const response: any = await postFavourites({
          productId: data.id,
          stationId,
          contractId,
          customerId,
          carrierId,
          operationTypeId
        });
        serviceListStore().pustFavouriteList({...response});
        alert.success(`Favorite created successfully Product:${data.title}`);
      }
      await workOrderList().getFavourites(true);
    }

    const favourite = ref(false);
    const refData = ref({});

    function showValue(data: any) {
      if (data) {
        return data.value
      }
    }

    const differenceHour = (formField) => {
      const startDate = formField.fullDateStart?.value;
      const endDate = formField.fullDateEnd?.value;
      if (startDate && endDate) {
        return qRampStore().getDifferenceInHours(startDate, endDate);
      }
      return 0
    };

    function calculateValuesMinimum(
      employeesTotal = 1,
      time = 0,
      baseMinimum = null,
      baseSurplus = null,
      holiday = null)
    {
      let totalMinimum = baseMinimum ? baseMinimum  * employeesTotal : null;
      let totalSurplus = baseSurplus ? baseSurplus * employeesTotal : null;
      const timeWithEmployees = employeesTotal * time;
      const titleRegHours = 'Reg. Hours:';
      const titleOtHour = 'OT Hours:';
      let minimunT = 0;
      if(timeWithEmployees < totalMinimum) {
        minimunT = totalMinimum;
      } else {
        minimunT = timeWithEmployees;
      }
      if(totalMinimum && !totalSurplus) {
        const titleMinimun = holiday ? titleOtHour : titleRegHours;
        return `${titleMinimun}: ${minimunT} - Total: (${timeWithEmployees})`
      }
      if(totalMinimum && totalSurplus) {
        if(holiday) {
          return `${titleOtHour}: ${minimunT} - Total: (${timeWithEmployees})`;
        }
        const remainingTime = Math.max(0, timeWithEmployees - totalMinimum);
        return `${titleRegHours} ${totalMinimum} ${titleOtHour} ${remainingTime} - Total: (${timeWithEmployees})`;
      }
      return `${titleRegHours} ${timeWithEmployees}`;
    }
    function calculateValuesFlatRate(
      employeesTotal = 1,
      time = 0,
      baseValueFrom = null,
      baseValueTo = null,
      baseSurplus = null,
      holiday = null) {
      const flatRade = time >= baseValueFrom ? baseValueTo * employeesTotal : time;
      const titleRegHours = 'Reg. Hours:';
      const titleOtHour = 'OT Hours:';

      if(baseValueFrom && !baseSurplus) {
        const title = holiday ? titleOtHour : titleRegHours;
        return `${title}: ${flatRade}`
      }

      if(baseValueFrom && baseSurplus) {
        const remainingTime = Math.max(0, (time - baseSurplus) * employeesTotal);
        if(holiday) {
          return `${titleOtHour}: ${remainingTime}`;
        }
        return `${titleRegHours} ${flatRade} ${titleOtHour} ${remainingTime}`;
      }

      return `${titleRegHours} ${0}`;
    }
    const differenceHourMultiple = (formField, index, product) => {
      indexMultiple.value = index;
      const titleRegHours = 'Reg. Hours:';
      const startDate = formField.start || null;
      const endDate = formField.end || null;
      const holiday = formField.holiday || null;
      const employeesTotal = formField?.employees?.length || 1;
      if (startDate && endDate) {
        const time = qRampStore().getDifferenceInHours(startDate, endDate);
        if(product.valueRules === 'minimum') {
          return calculateValuesMinimum(
            employeesTotal,
            time,
            product.valueFrom,
            product.surplus,
            holiday);
        }
        if(product.valueRules === 'Flat Rate') {
          return calculateValuesFlatRate(
            employeesTotal,
            time,
            product.valueFrom,
            product.valueTo,
            product.surplus,
            holiday);
        }
        return `Reg. Hours: ${qRampStore().getDifferenceInHours(startDate, endDate)}`
      }
      return '';
    };
    const transformerFields = (field, product, formField) => {
      if (product.productType === 4 && field.name === 'Employees' && field.type === 'select') {
        const rules = [val => {
          if (Array.isArray(val) && (formField.checkboxHoliday.value || formField.fullDateStart.value || formField.fullDateEnd.value)) {
            if (val.length === 0) {
              return i18n.tr('isite.cms.message.fieldRequired');
            }
          }
          return true;
        }]
        return {
          ...field,
          props: {
            ...field.props,
            rules,
          },
        };
      }
      if (product.productType === 4 && field.name === 'Start' && field.type === 'fullDate') {
        const rules = [val => {
          if (!val && (formField.checkboxHoliday.value || formField.fullDateEnd.value || formField.selectEmployees.value.length > 0)) {
            return i18n.tr('isite.cms.message.fieldRequired');
          }
          return true;
        }]
        return {
          ...field,
          props: {
            ...field.props,
            rules,
          },
        };
      }
      if (product.productType === 4 && field.name === 'End' && field.type === 'fullDate') {
        const startDate = formField.fullDateStart?.value
          ? moment(formField.fullDateStart.value, 'MM/DD/YYYY HH:mm')
          : null;
        const endDate = formField.fullDateEnd?.value
          ? moment(formField.fullDateEnd.value, 'MM/DD/YYYY HH:mm')
          : null;
        const options = {
          options: (dateTime, dateMin) => {
            if (!formField.fullDateStart.value) return false;
            if (isNaN(dateTime)) {
              return dateTime >= startDate.format('YYYY/MM/DD')
            }
            if (!formField.fullDateEnd.value) return false;
            if (dateMin) {
              return endDate.format('YYYY/MM/DD') === startDate.format('YYYY/MM/DD')
                ? dateMin >= Number(startDate.format('m'))
                : true;
            }
            return endDate.format('YYYY/MM/DD') === startDate.format('YYYY/MM/DD')
              ? dateTime >= startDate.format('H')
              : true;
          },
        };
        const rules = [val => {
          if (!val && (formField.checkboxHoliday.value || formField.fullDateStart.value || formField.selectEmployees.value.length > 0)) {
            return i18n.tr('isite.cms.message.fieldRequired');
          }
          if (!val && (!formField.checkboxHoliday.value || !formField.fullDateStart.value || formField.selectEmployees.value.length === 0)) {
            return true;
          }
          if (formField.fullDateStart?.value) {
            const FORMAT_DATE = 'MM/DD/YYYY HH:mm'
            const dateInFormat = formField.fullDateStart?.value
              ? moment(formField.fullDateStart?.value, FORMAT_DATE)
              : moment(FORMAT_DATE)

            const date = moment(val, FORMAT_DATE)

            const diff = date.diff(dateInFormat)

            return diff >= 0 || 'The end date cannot be less than the start date'
          }
        }]
        return {
          ...field,
          props: {
            ...field.props,
            rules,
            ...options,
          },
        };
      }
      if(field?.type === 'multiplier') {
        return {
          ...field,
          props: {
            ...field.props,
            disabledLabel: true,
            disabledBorder: true,
            summary: (formField, index) => differenceHourMultiple(formField, index, product),
            customRules: (fieldItem, indexItem, fieldL) => {

              if (fieldItem.name === 'employees' && fieldItem.type === 'select') {
                const rules = [val => {
                  if (Array.isArray(val) && Boolean(fieldL.holiday) || fieldL.start || fieldL.end) {
                    if (val.length === 0) {
                      return i18n.tr('isite.cms.message.fieldRequired');
                    }
                  }
                  return true;
                }]

                fieldItem.props.rules = lodash.cloneDeep(rules);
              }
              if (fieldItem.name === 'start' && fieldItem.type === 'fullDate') {
                const rules = [val => {
                  if (!val &&
                    (Boolean(fieldL.holiday) ||
                      fieldL.end ||
                      (Array.isArray(fieldL.employees) && fieldL.employees.length > 0))
                    ) {
                    return i18n.tr('isite.cms.message.fieldRequired');
                  }
                  return true;
                }]
                fieldItem.props.rules = lodash.cloneDeep(rules);
              }

              if (fieldItem.name === 'end' && fieldItem.type === 'fullDate') {
                const startDate = lodash.cloneDeep(fieldL.start
                  ? moment(fieldL.start, 'MM/DD/YYYY HH:mm')
                  : null);
                const endDate = lodash.cloneDeep(fieldL.end
                  ? moment(fieldL.end, 'MM/DD/YYYY HH:mm')
                  : null);

                const options = (dateTime, dateMin) => {
                  if (!lodash.cloneDeep(fieldL.start)) return false;
                  if (isNaN(dateTime)) {
                    return dateTime >= startDate.format('YYYY/MM/DD')
                  }
                  if (!lodash.cloneDeep(fieldL.end)) return false;
                  if (dateMin) {
                    return endDate.format('YYYY/MM/DD') === startDate.format('YYYY/MM/DD')
                      ? dateMin >= Number(startDate.format('m'))
                      : true;
                  }
                  return endDate.format('YYYY/MM/DD') === startDate.format('YYYY/MM/DD')
                    ? dateTime >= startDate.format('H')
                    : true;
                }

                const rules = [val => {
                  if (!val && (Boolean(fieldL.holiday) ||
                    fieldL.start ||
                    (Array.isArray(fieldL.employees) && fieldL.employees.length > 0))) {
                    return i18n.tr('isite.cms.message.fieldRequired');
                  }
                  if (!val && (!Boolean(fieldL.holiday) ||
                    !fieldL.start ||
                    !(Array.isArray(fieldL.employees) && fieldL.employees.length > 0))) {
                    return true;
                  }
                  if (fieldL.start) {
                    const FORMAT_DATE = 'MM/DD/YYYY HH:mm'
                    const dateInFormat = fieldL.start
                      ? moment(fieldL.start, FORMAT_DATE)
                      : moment(FORMAT_DATE)
                    const date = moment(val, FORMAT_DATE)
                    const diff = date.diff(dateInFormat)
                    return diff >= 0 || 'The end date cannot be less than the start date'
                  }
                }]
                fieldItem.props.rules = lodash.cloneDeep(rules);
                fieldItem.props.options = options;
              }
              return fieldItem;
            },
          },
        };
      }
      return field;
    }

    function setDynamicRef(index) {
      return (el) => {
        if (el) {
          dynamicRefs.value[`refsFynamicField-${index}`] = el;
        }
      };
    }

    onMounted(() => {
      serviceListStore().setRefGlobal({refServiceList: refServiceList.value});
    })
    return {
      isDesktop,
      showValue,
      data,
      favourite,
      selectFavourite,
      refData,
      permissionFavourite,
      isAppOffline,
      differenceHour,
      transformerFields,
      refServiceList,
      setDynamicRef,
      calculateValuesMinimum
    }
  },
})
</script>
<template>
  <q-form ref="refServiceList">
    <div id="expansion-container" class="tw-mb-12" style="max-width: 100%">
      <div v-if="!isDesktop">
        <q-list v-for="(item, index) in data" :key="index">
          <q-expansion-item header-class="text-white">
            <template v-slot:header>
              <q-item-section v-if="permissionFavourite.create" avatar class="q-pr-none " style="min-width: 45px;">
                <i
                  class="fa-star color-icon-star tw-cursor-pointer tw-text-2xl"
                  @click="selectFavourite(data[index])"
                  :class="{
                    'fa-solid': data[index].favourite,
                    'fa-light': !data[index].favourite,
                  }"
                />
              </q-item-section>
              <q-item-section class="q-py-sm">
                <p class="tw-text-base tw-font-bold" style="color:#1F294F;">
                  {{ item.title }}
                  <br>
                  <span v-if="item.helpText" class="tw-text-xs tw-text-gray-500">
                  {{ item.helpText }}
                </span>
                  <br>
                  <span v-if="item.valueFrom"  class="tw-text-xs tw-text-gray-500">
                  {{ item.valueRules }}: {{ item.valueFrom }}hrs
                </span>
                </p>
                <span class="tw-text-sm" style="color:#8A98C3;">{{ showValue(item.formField.quantity) }}</span>
              </q-item-section>
            </template>
            <q-card class="row card-color justify-center">
              <q-card-section class=" q-py-md col-12 col-md" v-for="(field, keyfield) in item.formField"
                              :key="keyfield">
                <label class="flex no-wrap items-center ">
                  <dynamic-field class="marginzero tw-w-full" v-model="data[index]['formField'][keyfield]['value']"
                                 :field="transformerFields(field, item, item.formField)"
                  />
                </label>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <!-- <q-separator color="red" />-->
        </q-list>
      </div>
      <div v-else>
        <div v-for="(item, index) in data" :key="index">
          <div
            class="color-bg-blue-gray-custom tw-py-2 tw-rounded-lg tw-relative"
            :class="{'tw-flex': item.productType != 4}"
          >
            <div
              class="tw-flex tw-w-2/5 tw-break-words tw-py-3 text-services tw-pl-2"

            >
              <div class="q-px-sm" v-if="permissionFavourite.create && !isAppOffline">
                <i
                  class="fa-star color-icon-star tw-cursor-pointer"
                  @click="selectFavourite(data[index])"
                  :class="{
                    'fa-solid': data[index].favourite,
                    'fa-light': !data[index].favourite,
                  }"
                />
              </div>
              <div>
                <p>{{ item.title }}</p>
                <p v-if="item.helpText" class="tw-text-xs tw-text-gray-500">{{ item.helpText }}</p>
                <p v-if="item.valueFrom" class="tw-text-xs tw-text-gray-500 tw-capitalize">{{ item.valueRules }} Quantity: {{ item.valueFrom }}hrs
                  <span v-if="item.valueRules === 'Flat Rate'">Flat rate value: {{item.valueTo}}</span></p>
              </div>
            </div>

            <div
              :class="{
                'tw-w-full tw-px-3': item.productType == 4,
                'tw-w-3/5 tw-mx-2 tw-truncate tw-flex tw-flex-wrap tw-justify-end tw-gap-4': item.productType != 4
              }"
            >
              <div v-for="(field, keyfield) in item.formField" :key="keyfield">
                <div>
                  <dynamic-field
                    v-model="data[index]['formField'][keyfield]['value']"
                    :field="transformerFields(field, item, item.formField)"
                    :ref="setDynamicRef(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<style>
#expansion-container {
  @apply tw-border tw-border-gray-100 tw-rounded-lg tw-overflow-hidden tw-p-3;
}

#expansion-container .card-color {
  @apply tw-rounded-lg tw-mx-4;
  background-color: #F1F4FA;
}

#expansion-container .q-expansion-item--collapsed {
  @apply tw-relative;
}

#expansion-container .q-expansion-item--collapsed:before {
  content: '';
  @apply tw-bg-gray-200 tw-mx-4 tw-absolute tw-bottom-0 tw-inset-x-0 tw-h-px;
}

.color-bg-blue-gray-custom:hover {
  background: rgba(241, 244, 250, 1);
}

.text-services {
  font-family: Manrope;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: rgba(76, 93, 148, 1);
}

.color-icon-star {
  color: rgba(138, 152, 195, 1)
}
</style>
