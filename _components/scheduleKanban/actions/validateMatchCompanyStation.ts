import storeFilter from '../store/filters.store'
import storeKanban from '../store/kanban.store'

export default function validateMatchCompanyStation(item) {
    let validatorCompany: boolean = false
    const matchCompany = Number(storeKanban.filterCompany) === Number(item.companyId)
    const matchStation = Number(item.id) === Number(storeFilter.stationId)

    if (Array.isArray(storeKanban.filterCompany)) validatorCompany = storeKanban.filterCompany.includes(item.companyId)
        else validatorCompany = matchCompany
        
    return matchStation && validatorCompany
}