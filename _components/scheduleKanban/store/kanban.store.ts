import {reactive, computed, ComputedRef} from 'vue';
import moment, { Moment } from 'moment';
import {Columns, State} from '../contracts/kanbanStore.contract'


const state: State = reactive({
  selectedDate: moment().format('YYYY/MM/DD'),
  scheduleType: 'week-agenda',
  isDraggingCard: false,
  columns: [],
  loading: false,
  dragDate: '',
  isBlank: false,
});

const store: State = computed(() => ({
  get selectedDate(): string {
    return state.selectedDate;
  },
  set selectedDate(value: string) {
    state.selectedDate = value;
  },
  get scheduleType(): string {
    return state.scheduleType;
  },
  set scheduleType(value: string) {
    state.scheduleType = value;
  },
  get isDraggingCard(): boolean {
    return state.isDraggingCard;
  },
  set isDraggingCard(value: boolean) {
    state.isDraggingCard = value;
  },
  get columns(): Columns[] {
    return state.columns;
  },
  set columns(value: Columns[]) {
    state.columns = value;
  },
  get loading(): boolean {
    return state.loading;
  },
  set loading(value: boolean) {
    state.loading = value;
  },
  get dragDate(): string {
    return state.dragDate;
  },
  set dragDate(value: string) {
    state.dragDate = value;
  },
  get isBlank(): boolean {
    return state.isBlank;
  },
  set isBlank(value: boolean) {
    state.isBlank = value;
  },
  
})).value;

export default store;