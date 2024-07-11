import { Form } from './form.contract';

export interface Store {
    isLoadingSearch: boolean;
    selectedTab: number;
    showModal: boolean;
    loading: boolean;
    widthModal: string;
    form: Form,
    isOpenTableModal: boolean;
    seletedDateColumn: any;
    stationId: number | null;
  }