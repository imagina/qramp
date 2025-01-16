import { Statictics } from '../contracts/statictics.contract';
import filtersStore from '../store/filters.store'
import dataReturnedStatistics from '../models/dataReturnedStatistics.model';
import storeKanban from '../store/kanban.store';
import getWorkOrdersStatisticsOffline from './getWorkOrdersStatisticsOffline';
import crud from 'src/modules/qcrud/_services/baseService'

export default async function getWorkOrdersStatistics(refresh = false, date): Promise<Statictics> {
    try {
        const params = {
            refresh,
            params: {
                filter: {
                    ...filtersStore.payload,
                    date,
                    withoutDefaultInclude: true,
                    order: {
                        field: 'schedule_date_local',
                        way: "asc",
                    },
                },
            },
        };

        if (!storeKanban.isAppOffline) {
            return crud.index(
                "apiRoutes.qramp.workOrdersStatistics",
                params,
            );
        }

        return getWorkOrdersStatisticsOffline(date)
    } catch (error) {
        console.log(error);
        return {
            ...dataReturnedStatistics
        }
    }
}
