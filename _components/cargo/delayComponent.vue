<template>
  <div class="tw-w-full tw-mb-20 tw-mt-5">
    <delayForm />
    <div class="tw-px-6 tw-mb-8">
      <q-toggle
        v-model="delay"
        color="primary"
        label="Delay"
        @update:modelValue="resetDelayList"
        v-if="!disableToggle"
      />
      <span class="tw-pl-6" v-else> Delay </span>
      <q-btn
        v-if="delay"
        class="q-ml-sm"
        flat
        round
        icon="fa-light fa-plus"
        color="primary"
        @click="addDelay()"
      />
    </div>
    <q-form ref="cargoDelay">
    <div v-if="delay" class="tw-px-6">
      <div class="row">
        <template v-for="(field, keyField) in delayFields" :key="keyField">
          <dynamic-field
            class="col-12 col-md-5 q-pr-sm"
            :field="field"
            v-model="
              delayList[
                keyField.includes('code')
                  ? keyField.split('code')[1]
                  : keyField.split('hours')[1]
              ][keyField.includes('code') ? 'code' : 'hours']
            "
          />
          <q-btn
            v-if="field.type !== 'select'"
            style="width: 40px; height: 38px"
            class="col-12 btn-stick col-md-1"
            round
            icon="fa-light fa-trash-can"
            flat
            size="12px"
            color="primary"
            @click="delDelay(keyField)"
          />
        </template>
      </div>
    </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import cargoStore from "./store/cargo";
import workOrderList from "../../_store/actions/workOrderList";
import qRampStore from "../../_store/qRampStore.js";
import delayForm from './delayForm.vue';
import { i18n } from 'src/plugins/utils'
import flightStore from "src/modules/qramp/_components/flight/store";

export default defineComponent({
  components: {
    delayForm,
  },
  setup() {
    const disabledReadonly = computed(() => qRampStore().disabledReadonly());
    const isPassenger = computed(() => qRampStore().getIsPassenger());
    const disableToggle = computed(() => flightStore().getDifferenceTimeMinute().inbound > 0 || flightStore().getDifferenceTimeMinute().outbound > 0);
    const delay = computed({
      get() {
        return cargoStore().getDelay();
      },
      set(value) {
        cargoStore().setDelay(value);
      },
    });

    const delayList = computed(() => cargoStore().getDelayList());
    const delayFields = computed(() => {
      const obj = {};
      delayList.value.forEach((delay, index) => {
        obj["code" + index] = {
          value: delay.code,
          type: "select",
          props: {
            hint: "if you don't know the delay code, please ask the airline representative",
            rules: [
              val => {
                const hoursField = obj["hours" + index]?.value;
                if (hoursField && !val) {
                  return 'This field is required because one flight has delay';
                }
                return true;
              }
            ],
            options: workOrderList().getWorkOrderDelays(),
            readonly: disabledReadonly.value,
            label: i18n.tr("isite.cms.label.code"),
            clearable: true,
            color: "primary",
            "hide-bottom-space": false,
          },
        };
        obj["hours" + index] = {
          value: delay.hours,
          type: "input",
          props: {
            rules: [
              val => obj["code" + index].value && val == 0 ?
                  false || 'The value cannot be 0 or void' : true
            ],
            hint: "Enter the Time in minutes",
            mask: "###################",
            readonly: disabledReadonly.value,
            label: i18n.tr("isite.cms.label.time"),
            clearable: true,
            color: "primary",
            "hide-bottom-space": false
          },
        };
      });
      return obj;
    });
    function delDelay(index) {
      const i = parseInt(index.slice(-1));
      delayList.value.splice(i, 1);
    }
    function resetDelayList() {
      if (!delay.value) {
        delayList.value = [];
      }
    }
    function addDelay() {
      delayList.value.push({
        code: "",
        hours: "",
      });
    }
    onMounted(() => {
      delay.value = delayList.value.length > 0;
    })
    return {
      delayFields,
      delayList,
      delDelay,
      delay,
      resetDelayList,
      addDelay,
      disableToggle,
    };
  },
});
</script>

<style></style>
