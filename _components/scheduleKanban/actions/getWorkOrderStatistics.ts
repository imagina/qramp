import { Statictics } from '../contracts/statictics.contract';
import filtersStore from '../store/filters.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import dataReturnedStatistics from '../models/dataReturnedStatistics.model';
import { BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_RAMP } from '../../model/constants';
import storeKanban from '../store/kanban.store';
import getWorkOrdersStatisticsOffline from './getWorkOrdersStatisticsOffline';
import crud from 'src/modules/qcrud/_services/baseService'

export default async function getWorkOrdersStatistics(refresh = false, date): Promise<Statictics> {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const businessUnitId = isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;
        const params = {
            refresh,
            params: {
                filter: {
                    businessUnitId,
                    ...filtersStore.payload,
                    date,
                    withoutDefaultInclude: true,
                    order: {
                        field: "schedule_date",
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
