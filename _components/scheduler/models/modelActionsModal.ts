import { computed, ComputedRef } from 'vue';
import save from '../actions/save'
import update from '../actions/update'
import store from '../store/index.store'
import {
    ModelActionsModalResult,
    Action,
    Proxy
} from '../contracts/modelActionsModal.contract'
import { i18n, eventBus } from 'src/plugins/utils'


export default function modelActionsModal(refFormFields): ModelActionsModalResult {
    const { tr } = i18n
    const actions: ComputedRef<Action[]> = computed(() => ([
        {
            props: {
                loading: store.loading,
                color: 'primary',
                'icon-right': 'fa-thin fa-floppy-disk',
                label: i18n.tr('isite.cms.label.save'),
            },
            action: () => {
                const refFormScheduler = refFormFields.$refs.refFormScheduler;
                if (refFormScheduler) {
                    refFormScheduler
                        .validate()
                        .then(async (success) => {
                            if (success) {
                                if (store.form.id) {
                                    await update();
                                } else {
                                    await save()
                                }
                                await store.reset();
                              eventBus.emit('crud.data.refresh');
                            }
                        })
                }
            }
        },
    ]));

    return {
        actions
    }
}
