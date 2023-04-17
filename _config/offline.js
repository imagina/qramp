import workOrderList from '../_store/actions/workOrderList.ts';
import cache from "@imagina/qsite/_plugins/cache";


export default async function () {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.updateOfflineList) workOrderList().getAllList(event.data.updateOfflineList);
  });
  let updateOfflineList = await cache.get.item('updateOfflineList') || false;
  //=========== Set base url to axios
  await workOrderList().getAllList(updateOfflineList);

  if (updateOfflineList) {
    await cache.set('updateOfflineList', false);
  }
}
