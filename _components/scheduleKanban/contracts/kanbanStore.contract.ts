import moment, { Moment } from "moment";

export interface Columns {
  date: Moment; // You can adjust the type to match your use case
  cards: any[]; // Replace 'any' with the actual card type
  page: number;
  loading: boolean;
}

export interface State {
  selectedDate: string;
  scheduleType: string;
  isDraggingCard: boolean;
  columns: Columns[];
  loading: boolean;
}
