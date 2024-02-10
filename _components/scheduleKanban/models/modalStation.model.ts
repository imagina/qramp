import { computed, getCurrentInstance } from 'vue';
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList';

export default function modalStation() {
  const proxy = getCurrentInstance().appContext.config.globalProperties
      const fields = computed(() => ({
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
            props: {
              label: "Station",
              rules: [
                (val) => !!val || proxy.$tr("isite.cms.message.fieldRequired"),
              ],
              clearable: true,
              options: workOrderList().getStationList().map(item => ({
                label: item.fullName,
                value: item.id
              })),
            },
        },
    }))

    return {
      fields,
    }
}
