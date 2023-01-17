<template>
  <master-modal
    v-model="show"
    :title="title"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    :actions="actions"
    :maximized="$q.screen.lt.md"
    :width="form.id ? '70%' : '400px'"
    :customClass="`tw-border-l-2 tw-border-${flightStatusComputed() ? flightStatusComputed().color : 'gray-100'}`"
  >
    <q-form ref="formSchedule">
      <div 
        class="tw-grid tw-grid-cols-1 tw-gap-4"
        :class="{'lg:tw-grid-cols-2': form.id}"
      >
          <div>
            <div v-for="(field, keyField) in fields.form" :key="keyField">
            <dynamic-field
              :field="field"
              v-model="form[keyField]"
              @input="zanetizeData(keyField)"
              :class="{ 'tw-hidden': keyField === 'stationId' }"
            />
          </div>
        </div>
        <div>
          <comments 
            v-if="form.id"
            apiRoute="apiRoutes.qramp.comments"
            :commentableId="Number(form.id)"
            commentableType="Modules\Ramp\Entities\WorkOrder"
            class="tw-py-4"
          />
        </div>
      </div>
    </q-form>
  </master-modal>
</template>
<script>
import scheduleField from "../fields/scheduleField.js";
import qRampStore from '../../../_store/qRampStore.js';
import comments from '@imagina/qsite/_components/master/comments/index.vue'
export default {
  components: {comments},
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
      this.sessionStationId =
        sessionStorage.getItem("stationId") !== "null"
          ? sessionStorage.getItem("stationId")
          : null;
      await this.getFlightStatusList();
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
            this.$emit("deleteSchedule", this.form.id);
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
        this.sessionStationId = sessionStorage.getItem("stationId") !== 'null' ? sessionStorage.getItem("stationId") : null;
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
    flightStatusComputed() {
      return this.flightStatusList.find(item => item.id == this.form.flightStatusId) || null;
    },
  },
};
</script>