import { computed } from "vue";
import storeKanban from "../store/kanban.store";
import moment, { Moment } from "moment";
import getWorkOrder from "../actions/getWorkOrder";
import { Columns } from "../contracts/kanbanStore.contract";

export async function getColumns(): Promise<Columns[]> {
  try {
    const startOfWeek: Moment = moment(storeKanban.selectedDate).startOf(
      "week"
    );

    return [...Array(7)].map((_, i) => ({
      date: moment(startOfWeek).add(i, "days"),
      cards: [],
      page: 1,
      loading: false,
      total: 0,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getCards(): Promise<void> {
  try {
    storeKanban.columns.forEach(async (item: Columns) => {
      item.loading = true;
      const response = await getWorkOrder(true, item.page, {
        field: "schedule_date",
        type: "customRange",
        from: item.date.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        to: item.date.endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      });
      item.cards = response.data;
      item.loading = false;
      item.total = response.meta.page.total;
    });
  } catch (error) {
    console.log(error);
  }
}

export default async function buildKanbanStructure(): Promise<void> {
  try {
    storeKanban.loading = true;
    storeKanban.columns = await getColumns();
    await getCards();
    storeKanban.loading = false;
  } catch (error) {
    console.log(error);
    storeKanban.loading = false;
  }
}
