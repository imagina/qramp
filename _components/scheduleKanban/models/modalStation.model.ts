import Vue from 'vue';

export default  {
    banner: {
        type: 'banner',
        props: {
          color: 'info',
          icon: 'fas fa-exclamation-triangle',
          message: 'You must first select a Station',
        }
    },
    stationId: {
        value: null,
        type: "select",
        loadOptions: {
          apiRoute: "apiRoutes.qsetupagione.setupStations",
          select: { label: "fullName", id: "id" },
          requestParams: {
            filter: {
              companyId: 26,
            },
          },
        },
        props: {
          label: "Station",
          rules: [
            (val) => !!val || Vue.prototype.$tr("isite.cms.message.fieldRequired"),
          ],
          clearable: true,
        },
    },
}