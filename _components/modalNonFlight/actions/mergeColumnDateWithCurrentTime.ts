import moment from 'moment-timezone'

export const mergeColumnDateWithCurrentTime = (dateColumn: string) => {
    try {
        const FULL_DATE_FORMAT = 'MM/DD/YYYY HH:mm'
        const currentDate = moment().format(FULL_DATE_FORMAT)
        if (!dateColumn) return currentDate
    
        const seletedDateColumn = moment(dateColumn).format('MM/DD/YYYY')
        const hour = moment().format('HH:mm:ss')
        const dateFull = moment(`${seletedDateColumn} ${hour}`, FULL_DATE_FORMAT).format(FULL_DATE_FORMAT)
        return dateFull === 'Invalid date' ? currentDate : dateFull
    } catch (error) {
        console.log(error)
    }
}