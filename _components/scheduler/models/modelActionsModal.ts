import Vue, { computed, getCurrentInstance } from 'vue';
import save from '../actions/save'
import update from '../actions/update'
import store from '../store/index.store'

export default function modelActionsModal() {
    const proxy = (getCurrentInstance() as any).proxy;
    const actions = computed(() => ([
        {
            props: {
                loading: store.loading,
                color: 'primary',
                'icon-right': 'fa-thin fa-floppy-disk',
                label: Vue.prototype.$tr('isite.cms.label.save'),
            },
            action: () => {
                const refFormScheduler = proxy.$refs.refFormFields.$refs.refFormScheduler;
                if (refFormScheduler) {
                    refFormScheduler
                     .validate()
                     .then(async (success) => {
                        if (success) {
                            if(store.form.id) {
                                await update();
                            } else {
                                await save()
                            }
                            await store.reset();
                            proxy.$root.$emit('crud.data.refresh');
                        }
                    })
                }
            }
        },
    ]))

    return {
        actions
    }
}