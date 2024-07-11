import Vue, { ref, computed, toRefs } from 'vue'

export default function useSyncCard(props) {
    const isLoading = ref(false)
    const billingClosedDate = ref('')
    const updateDate = ref('')
    const authorUpdated = ref('')
    const {
        items,
    } = toRefs(props);

    const lastBillingClosingDate = computed(() => updateDate.value || items.value?.plainValue || '')
	const by = computed(() => authorUpdated.value || items.value?.options?.billingClosedDateByName || '');
	
	const markAsSync = async () => {
        try {
            isLoading.value = true
            const response = await Vue.prototype.$crud.post(
                props.cardParams.apiRoutePost,
                { attributes: { lastBillingClosedDate: billingClosedDate.value } }
            )
            updateDate.value = response?.data?.plainValue
            authorUpdated.value = response?.data?.options?.billingClosedDateByName
            billingClosedDate.value = ''
            Vue.prototype.$alert.info('Date updated successfully')
        } catch (error) {
            Vue.prototype.$apiResponse.handleError(error, () => {              
                Vue.prototype.$alert.error(error)
            })
        } finally {
            isLoading.value = false
        }
	}
	return {
		isLoading,
        billingClosedDate,
		lastBillingClosingDate,
		markAsSync,
		by
	}
}
