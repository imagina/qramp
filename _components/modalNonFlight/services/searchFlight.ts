import store from '../store/index.store'
import { alert, i18n } from 'src/plugins/utils'
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList'
import { getBillingDateData } from './getBillingDateData'

export const getSearchByFlightNumber = async (flightNumber) => {
    try {
        store.isLoadingSearch = true
        const flightData = await workOrderList().getWorkOrderSearch(flightNumber) || {};
        if (flightData.data.length === 0) return
        await getBillingDateData()
        return flightData?.data
    } catch (error) {
        alert.error({
            message: i18n.tr("ifly.cms.message.errorlookingForFlight")
        })
        console.error(error);
        return []
    } finally {
      store.isLoadingSearch = false
    }
  }