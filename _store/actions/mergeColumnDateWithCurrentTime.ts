import moment from 'moment-timezone'
import modalScheduleStore from 'src/modules/qramp/_components/scheduleKanban/store/modalSchedule.store'

export const mergeColumnDateWithCurrentTime = () => {
    const FULL_DATE_FORMAT = 'MM/DD/YYYY HH:mm'
    const seletedDateColumn = moment(modalScheduleStore.seletedDateColumn).format('MM/DD/YYYY')
    const hour = moment().format('HH:mm:ss')
    const dateFull = moment(`${seletedDateColumn} ${hour}`, FULL_DATE_FORMAT).format(FULL_DATE_FORMAT)
    return dateFull === 'Invalid date' ? moment().format('MM/DD/YYYY HH:mm') : dateFull
}