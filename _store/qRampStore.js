import { reactive } from '@vue/composition-api';
import { 
    STATUS_DRAFT,
    STATUS_POSTED,
    STATUS_SUBMITTED 
} from '@imagina/qramp/_components/model/constants.js'

const state = reactive({
    statusId: STATUS_DRAFT,
    needToBePosted: false,
});

export default function qRampStore() {
    function setStatusId(value) {
        state.statusId = value;
    }
    function setNeedToBePosted(value) {
        state.needToBePosted = value;
    }
    function disabledReadonly() {
        if(state.statusId === STATUS_DRAFT && state.needToBePosted) {
          return true;
        }
        if(state.statusId === STATUS_POSTED 
          || state.statusId === STATUS_SUBMITTED
        ) {
          return true;
        }
        return false;
    }
    return {
        disabledReadonly,
        setStatusId,
        setNeedToBePosted,
    }
}