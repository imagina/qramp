import { STATUS_DRAFT, STATUS_SCHEDULE } from "../../model/constants";
import { Statictics } from "../contracts/statictics.contract";
import dataReturnedStatisticsModel from "../models/dataReturnedStatistics.model";
import getFilteredWorkOrdersOffline from "./getFilteredWorkOrdersOffline";
import storeKanban from "../store/kanban.store";

export default async function getWorkOrdersStatisticsOffline(date): Promise<Statictics> {
    try {
      const statusList: number[] = []
      if (!storeKanban.statusIdList) {
        const workOrdersFiltered = await getFilteredWorkOrdersOffline(date)
        workOrdersFiltered.map(workOrder => statusList.push(workOrder.statusId))
      }
      const dataSource = storeKanban.statusIdList ? storeKanban.statusIdList : statusList

      const workOrderListNoCompleted = dataSource?.filter(workOrder => {
        const noCompleted = [STATUS_DRAFT, STATUS_SCHEDULE]
        return noCompleted.includes(workOrder)
      })
      const workOrderListLength: number = dataSource?.length || 0
      const uncompleted: number = workOrderListNoCompleted?.length || 0
      const completed: number = workOrderListLength - uncompleted
      
      storeKanban.statusIdList = null

      return {
        ...dataReturnedStatisticsModel,
        data: {
          completed,
          uncompleted,
        }
      }
    } catch (err) {
      console.error(err)
      return {
        ...dataReturnedStatisticsModel
      }
    }
  }