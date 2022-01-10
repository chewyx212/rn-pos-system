import { OrderDetailType, ItemInCartType } from "./itemType";
export interface TableDataType {
  id: number;
  name: string;
  table_category_id: number;
  table_category: TableCategoryType;
  order: any[];
  status: number;
  pax: number;
  total: string;
}

export interface TableCategoryType {
  id: number;
  name: string;
}

export interface OrderType {
  id: number;
  orderType: number;
  tableId?: number;
  pax?: number;
  items: ItemInCartType[];
  orderIndex: number;
  orderStatus: number;
  detail: OrderDetailType;
}

export interface CreateTableType {
  name: string;
  restaurant_id: string;
}


export interface TableListType {
  id: number;
  table_name: string;
  table_categories: TableCategoryListType[];
}

export interface TableCategoryListType {
  id: number;
  name: string;
}

export interface CreateTableCategoryType{
  name: string;
}

