import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import stepps from '../models/defaultModels/stepps';
import store from '../store/index';
import workOrderList from 'modules/qramp/_store/actions/workOrderList';
import qRampStore from 'modules/qramp/_store/qRampStore';
import serviceListStore from '../../serviceList/store/serviceList';

export default function stepperController() {
  const refStepper: any = ref(null);
  function next() {
    refStepper.value.next();
  }
  function back() {
    refStepper.value.previous();
  }
  const step = computed({
    get() {
      return store.step;
    },
    set(value: number) {
      store.step = value;
    }
  });
  onMounted(async () => {
    await workOrderList().getFavourites(true);
  })
  onBeforeUnmount(() => {
    store.reset();
    serviceListStore().setErrorList([]);
    serviceListStore().setShowFavourite(false)
    qRampStore().setClonedWorkOrder(null)
  })
  return {
    step,
    stepps,
    refStepper,
    next,
    back
  }
}