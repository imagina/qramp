import { store } from 'src/plugins/utils'
import baseService from "src/modules/qcrud/_services/baseService.js";
import workOrderList from "../../../_store/actions/workOrderList";

const getContractRules = async (contractId?: null | []): Promise<any[]> => {
  if (store.hasAccess('ramp.passenger-contract-rules.index')) {
    try {

      let requestParams = {
        params: {
          include:
            "contract,contractLine,product",
          filter: {
            contractId,
          }
        },
      };
      const response = await baseService.index(
        "apiRoutes.qramp.passengerContractRules",
        requestParams
      );
      workOrderList().setContractRulesList(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    return [];
  }
}

export default getContractRules;
