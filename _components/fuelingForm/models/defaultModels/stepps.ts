import flight from '../../components/flight.vue';
import serviceList from '../../../serviceList/index.vue';
import remarks from '../../../remarks/index.vue';
import { ref } from 'vue';

export default ref([
    {
      refs: 'refFlight',
      title: 'Flight',
      icon: 'fa-regular fa-plane',
      step: 1,
      component: flight,
      error: false,
      done: false,
    },
    {
      refs: 'refServices',
      title: 'Services',
      icon: 'fa-regular fa-briefcase-blank',
      step: 2,
      component: serviceList,
      error: false,
      done: false,
    },
    {
      refs: 'refRemark',
      title: 'Remark',
      icon: 'fa-regular fa-comment-dots',
      step: 3,
      component: remarks,
      error: false,
      done: false,
    },
  ]).value