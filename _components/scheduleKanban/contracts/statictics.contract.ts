import { Page } from "./getWorkOrder.contract"

export interface Statictics {
    data: {
        completed: number,
        uncompleted: number
    },
    meta: {
        page: Page
    }
}