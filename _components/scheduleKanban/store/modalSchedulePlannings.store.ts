import { reactive, computed } from 'vue';
interface Form {
  flightNumber: null | string;
  operationTypeId: null | number;
  alwaysHalf: boolean
}
const state = reactive({
  form: {
    flightNumber: null,
    operationTypeId: null,
    alwaysHalf: false
  },
  std: null,
  sta: null,
  showModal: false,
  loading: false,
  isEdit: false,
});

const store = computed(() => ({
  get showModal(): boolean {
    return state.showModal;
  },
  set showModal(value: boolean) {
    state.showModal = value;
  },
  get loading(): boolean {
    return state.loading;
  },
  set loading(value: boolean) {
    state.loading = value;
  },
  get std(): string {
    return state.std;
  },
  set std(value: string) {
    state.std = value;
  },
  get isEdit(): boolean {
    return state.isEdit;
  },
  set isEdit(value: boolean) {
    state.isEdit = value;
  },
  get form() : Form
  {
    return state.form;
  },
  set form(data: Form) {
    state.form.flightNumber = data.flightNumber || null;
    state.form.operationTypeId = data.operationTypeId || null;
    state.form.alwaysHalf = data.alwaysHalf || null;
  },
  get sta(): string {
    return state.sta;
  },
  set sta(value: string) {
    state.sta = value;
  },
  reset(): void {
    state.form = {
      flightNumber: null,
      operationTypeId: null,
      alwaysHalf: false
    }
    state.showModal = false
    state.loading = false
    state.sta = null
    state.std = null
    state.isEdit = false;
  }
})).value;

export default store;
