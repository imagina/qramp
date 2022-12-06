<template>
  <master-modal
    v-model="visible"
    title="Filter schedule"
    :persistent="true"
    :loading="loading"
    :actions="actions"
    hideCloseAction
    :maximized="$q.screen.lt.md"
  >
    <dynamic-field :field="field.banner" v-model="stationId" />
    <q-form ref="formStation">
      <dynamic-field :field="field.stationId" v-model="stationId" />
    </q-form>
  </master-modal>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    loading: false,
    stationId: null,
  }),
  computed: {
    actions() {
      return [
        {
          props: {
            color: "primary",
            label: "filters",
          },
          action: async () => {
            this.saveFilter();
          },
        },
      ];
    },
    field() {
      return {
        banner: {
          type: 'banner',
          props: {
            color: 'info',
            icon: 'fas fa-exclamation-triangle',
            message: 'You must first select a Station',
          }
        },
        stationId: {
          value: this.stationId,
          type: "select",
          loadOptions: {
            apiRoute: "apiRoutes.qsetupagione.setupStations",
            select: { label: "stationName", id: "id" },
          },
          props: {
            label: "Station",
            rules: [
              (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
            ],
            clearable: true,
          },
        },
      };
    },
  },
  methods: {
    hideModal() {
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    saveFilter() {
      try {
        this.$refs.formStation.validate().then(async (success) => {
          if (success) {
            sessionStorage.setItem("stationId", this.stationId);
            this.$emit("saveFilterStationId", this.stationId);
            this.hideModal();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>