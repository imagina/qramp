<template>
  <master-modal
    v-model="show"
    :title="title"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    :actions="actions"
    :maximized="$q.screen.lt.md"
    :customClass="`tw-border-l-2 tw-border-${scheduleStatusComputed() ? scheduleStatusComputed().color : 'gray-100'}`"
  >
    <q-form ref="formSchedule">
      <div v-for="(field, keyField) in fields.form" :key="keyField">
        <dynamic-field
          :field="field"
          v-model="form[keyField]"
          @input="zanetizeData(keyField)"
        />
      </div>
    </q-form>
  </master-modal>
</template>
<script>
import scheduleField from "../fields/scheduleField.js";
import qRampStore from '../../../_store/qRampStore.js';
export default {
  mixins: [scheduleField],
  data() {
    return {
      show: false,
      loading: false,
      title: null,
      form: {},
      isEdit: false,
      dataLoad: false,
    };
  },
  async created() {
    this.$nextTick(async function () {
      await this.getScheduleStatusList();
    })
  },
  computed: {
    isBlank() {
      return qRampStore().getIsblank();
    },
    actions() {
      return [
        {
          props: {
            vIf: !this.isBlank,
            color: "primary",
            label: this.$tr("isite.cms.label.close"),
          },
          action: () => {
            this.hideModal();
          },
        },
        {
          props: {
            vIf: !this.isBlank,
            color: "primary",
            label: this.isEdit
              ? this.$tr("isite.cms.label.update")
              : this.$tr("isite.cms.label.save"),
          },
          action: async () => {
            await this.saveScheduleForm();
          },
        },
        {
          props: {
            vIf: this.isEdit && !this.isBlank,
            color: "red",
            label: this.$tr("isite.cms.label.delete"),
          },
          action: () => {
            this.$emit("deleteSchedule");
            this.hideModal();
          },
        },
      ];
    },
  },
  methods: {
    hideModal() {
      this.show = false;
      this.form = {};
    },
    async openModal(title = null, data = null, date) {
      try {
        this.dataLoad = true;
        let currentDate = this.$moment().format('MM/DD/YYYY');
        if(this.$moment().format('YYYY-MM-DD') !== date) {
          currentDate = this.$moment(date).format('MM/DD/YYYY');
        }
        this.title = title;
        this.show = true;
        this.isEdit = !!data;
        this.form.inboundScheduledArrival = currentDate;
        if (data) this.form = data;
        setTimeout(() => {
          this.dataLoad = false;
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
    async saveScheduleForm() {
      try {
        this.$refs.formSchedule.validate().then(async (success) => {
          if (success) {
            this.tranformData();
            if (this.isEdit) {
              this.$emit("updateSchedule", this.form);
            } else {
              this.$emit("addSchedule", this.form);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    tranformData() {
      this.form.inboundScheduledArrival = `${this.$moment(this.form.inboundScheduledArrival).format('MM/DD/YYYY')} ${this.form.sta}`;
    },
    zanetizeData(key) {
      if(this.dataLoad) return;
      if (key === "flightNumber") {
        this.form[key] = this.form[key].toUpperCase().replace(/\s+/g, "");
      }
      if (key === "stationId") {       
        this.form.gateId = null;
        return;
      }
    },
    setLoading(value) {
      this.loading = value;
    },
    scheduleStatusComputed() {
      return this.scheduleStatusList.find(item => item.id == this.form.scheduleStatusId) || null;
    },
  },
};
</script>