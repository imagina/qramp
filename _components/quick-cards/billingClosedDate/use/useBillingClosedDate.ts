import { ref, computed, toRefs } from 'vue'
import { alert } from 'src/plugins/utils'
import baseService from 'src/modules/qcrud/_services/baseService'
import apiResponse from 'modules/qcrud/_plugins/apiResponse'

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
            const response = await baseService.post(
                props.cardParams.apiRoutePost,
                { attributes: { lastBillingClosedDate: billingClosedDate.value } }
            )
            updateDate.value = response?.data?.plainValue
            authorUpdated.value = response?.data?.options?.billingClosedDateByName
            billingClosedDate.value = ''
            alert.info('Date updated successfully')
        } catch (error) {
            apiResponse.handleError(error, () => {              
                alert.error(error)
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
