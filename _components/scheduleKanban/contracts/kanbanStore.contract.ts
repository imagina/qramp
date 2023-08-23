import moment, { Moment } from "moment";

export interface Columns {
  isDrag: boolean;
  date: Moment; // You can adjust the type to match your use case
  cards: any[]; // Replace 'any' with the actual card type
  page: number;
  loading: boolean;
  total: number;
}

export interface State {
  selectedDate: string;
  scheduleType: string;
  isDraggingCard: boolean;
  columns: Columns[];
  loading: boolean;
  dragDate: string;
  isBlank: boolean;
}
