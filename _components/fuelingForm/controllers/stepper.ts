import { computed, ref } from 'vue';
import stepps from '../models/defaultModels/stepps';
import store from '../store/index';

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
  return {
    step,
    stepps,
    refStepper,
    next,
    back
  }
}