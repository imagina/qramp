import workOrderList from '../_store/actions/workOrderList.ts';


export default async function (refresh = false) {
  await workOrderList().getAllList(refresh);
}
