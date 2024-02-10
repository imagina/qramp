import { computed, getCurrentInstance, ComputedRef } from 'vue';
import store from '../store/filters.store'
import {
    ModelActionsModalResult,
    Action,
    Proxy
} from '../contracts/modelActionsModal.contract';

export default function modelActionsModal(): ModelActionsModalResult {
    const proxy = getCurrentInstance().appContext.config.globalProperties
    const actions: ComputedRef<Action[]> = computed(() => ([
        {
            props: {
                loading: store.loading,
                color: 'primary',
                label: proxy.$tr('isite.cms.label.search'),
            },
            action: () => {
                // add action
            }
        },
    ]));

    return {
        actions
    }
}
