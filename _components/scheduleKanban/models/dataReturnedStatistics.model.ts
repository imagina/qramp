import { page } from "./dataReturnedWorkOrder.model"

export default {
    data: {
        completed: 0,
        uncompleted: 0,
    },
    meta: {
      page: {
        ...page
      }
    }
  }