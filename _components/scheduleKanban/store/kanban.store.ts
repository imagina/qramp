import {reactive, computed} from 'vue';
import moment from 'moment';

const state = reactive({
    selectedDate: moment().format('YYYY/MM/DD'),
    scheduleType: 'week-agenda',
    isDraggingCard: false,
});


const store = computed(() => ({
    get selectedDate() {
        return state.selectedDate;
    },
    set selectedDate(value) {
        state.selectedDate = value;
    },
    get scheduleType() {
        return state.scheduleType;
    },
    set scheduleType(value) {
        state.scheduleType = value;
    },
    get isDraggingCard() {
        return state.isDraggingCard;
    },
    set isDraggingCard(value) {
        state.isDraggingCard = value;
    },
})).value;

export default store;