import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store/index.store'

export default async function saveScheduler(): Promise<void> {
    try {
        await baseService.create('apiRoutes.qramp.schedulers', store.form);
    } catch (error) {
      console.log(error, 'saveScheduler');
    }
}