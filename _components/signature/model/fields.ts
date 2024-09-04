import { computed } from 'vue';
import { i18n } from 'src/plugins/utils'
import store from '../store/index.store'

const isFull = computed(() => store.isFull);
const disabledReadonly = computed(() => store.disabledReadonly);
const readonly = computed(() => store.readonly);


export const fields = computed(() => ({
    customer: {
        customer: {
            value: '',
            name: 'customerSignature',
            type: 'signature',
            props: {
                btnFullscreen: true,
                btnFullscreenIcon: isFull.value ? 'zoom_in_map' : 'zoom_out_map',
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('ifly.cms.form.customerRepresentativeSignature'),
            },
        },
        printName: {
            name: 'customerName',
            value: '',
            type: 'input',
            'icon-right': 'fas fa-user',
            props: {
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('isite.cms.form.printName'),
            },
        },
        title: {
            name: 'customerTitle',
            value: '',
            type: 'input',
            'icon-right': 'fas fa-user',
            props: {
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('isite.cms.form.title'),
            },
        },
    },
    representative: {
        representative: {
            value: '',
            name: 'representativeSignature',
            type: 'signature',
            props: {
                btnFullscreen: true,
                btnFullscreenIcon: isFull.value ? 'zoom_in_map' : 'zoom_out_map',
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('ifly.cms.form.AgiRepresentativeSignature'),
            },
        },
        printName: {
            name: 'representativeName',
            value: '',
            type: 'input',
            'icon-right': 'fas fa-user',
            props: {
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('isite.cms.form.printName'),
            },
        },
        title: {
            name: 'representativeTitle',
            value: '',
            type: 'input',
            'icon-right': 'fas fa-user',
            props: {
                readonly: readonly.value || disabledReadonly.value,
                label: i18n.tr('isite.cms.form.title'),
            },
        },
    }
}))