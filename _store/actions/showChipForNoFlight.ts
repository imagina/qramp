import { NON_FLIGHT } from '../../_components/model/constants'

export const showChipForNoFlight = (type: string | number, label: string) => {
    const isNonFlight = Number(type) === NON_FLIGHT
    return isNonFlight ? { label: 'Non-flight' } : label
}