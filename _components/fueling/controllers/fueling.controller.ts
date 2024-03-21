
import { computed } from 'vue'
import { fields } from '../models/fields.model'
import store from '../store/index.store'
import { i18n } from 'src/plugins/utils'

export const fuelingController = () => {
    const loading = computed(() => store.loading)
    const showModal = computed(() => store.showModal)
    const titleModal = computed(() => store.titleModal)
    const form = computed(() => store.form)

    const save = () => {
        // Save data
    }

    const actions = computed(() => {
        return [
            {
                props: {
                    loading: store.loading,
                    color: 'primary',
                    'icon-right': 'fa-thin fa-floppy-disk',
                    label: i18n.tr('isite.cms.label.save'),
                },
                action: () => {
                    save()
                }
            }
        ]
    })

    const clear = () => {
        store.reset()
    }

    return { 
        loading, 
        showModal, 
        titleModal, 
        actions,
        fields,
        form, 
        clear
    }
}