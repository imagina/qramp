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
          :key="keyField"
          :id="keyField"
          :field="field"
          v-model="form[keyField]"
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
            this.saveScheduleForm();
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
    openModal(title = null, data = null) {
      try {
        this.title = title;
        this.show = true;
        this.isEdit = !!data;
        if (data) this.form.title = data.title;
      } catch (error) {
        console.log(error);
      }
    },
    saveScheduleForm() {
      this.$refs.formSchedule.validate().then(async (success) => {
        if (success) {
          if (this.isEdit) {
            this.$emit("updateSchedule", this.form);
          } else {
            this.$emit("addSchedule", this.form);
          }
          this.hideModal();
        }
      });
    },
  },
};
</script>