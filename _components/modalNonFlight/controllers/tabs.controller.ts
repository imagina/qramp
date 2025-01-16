import { computed, getCurrentInstance, onMounted, watch } from 'vue'
import qRampStore from 'src/modules/qramp/_store/qRampStore'
import store from '../store/index.store'
import { 
    FLIGHT, 
    NON_FLIGHT
} from 'src/modules/qramp/_components/model/constants'

export default function tabController(props: any = null, emit: any = null) {
    const handleChangesTab = (value) => {
        if (isAppOffline.value) { 
            store.selectedTab = NON_FLIGHT
            return
        };
        store.selectedTab = value;
    }

    const proxy: any = (getCurrentInstance() as any).proxy

    const selectedTab = computed(() => {
        return store.selectedTab;
    })

    const validateNoFligth = computed(() => {
        return qRampStore().getTypeWorkOrder() === NON_FLIGHT;
    })

    const isAppOffline = computed(() => {
        return proxy.$store.state.qofflineMaster.isAppOffline
    })

    const iconColorToggle = computed(() => {
        return store.selectedTab === FLIGHT
    })

    const tapOptions = computed(() => {
        return [
            { 
                label: 'Additional Flight Services', 
                value: FLIGHT, 
                slot: 'one', 
                disable: isAppOffline.value
            },
            { label: 'Non Flight Services', value: NON_FLIGHT, slot: 'two' },
        ]
    })
    
    watch(isAppOffline, (value) => {
        if (value) store.selectedTab = NON_FLIGHT
    })

    onMounted(() => {
        if (isAppOffline.value) store.selectedTab = NON_FLIGHT
    })

    return {
        handleChangesTab,
        iconColorToggle,
        selectedTab,
        validateNoFligth,
        isAppOffline,
        tapOptions,
    }
}