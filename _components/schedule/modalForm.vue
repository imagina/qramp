<template>
  <master-modal
    v-model="show"
    :title="title"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    :actions="actions"
    :maximized="$q.screen.lt.md"
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
import scheduleField from "./fields/scheduleField.js";
export default {
  mixins: [scheduleField],
  data() {
    return {
      show: false,
      loading: false,
      title: null,
      form: {},
      isEdit: false,
    };
  },
  computed: {
    actions() {
      return [
        {
          props: {
            color: "primary",
            label: this.$tr("isite.cms.label.close"),
          },
          action: () => {
            this.hideModal();
          },
        },
        {
          props: {
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
            vIf: this.isEdit,
            color: "primary",
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
    openModal(title = null, data = null, date) {
      try {
        let currentDate = this.$moment().format('YYYY-MM-DDTHH:mm:ss');
        if(this.$moment().format('YYYY-MM-DD') !== date) {
          currentDate = this.$moment(date).format('YYYY-MM-DDTHH:mm:ss');
        }
        this.title = title;
        this.show = true;
        this.isEdit = !!data;
        this.form.inboundScheduledArrival = currentDate;
        if (data) this.form = data;
      } catch (error) {
        console.log(error);
      }
    },
    async saveScheduleForm() {
      try {
        this.$refs.formSchedule.validate().then(async (success) => {
          if (success) {
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
    zanetizeData(key) {
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
  },
};
</script>