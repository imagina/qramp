import workOrderList from '../_store/actions/workOrderList.ts'


export default function () {
  //=========== Set base url to axios
  workOrderList().getAllList();
}
