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
  tableId: number;
  pax: number;
  items: any[];
  orderStatus: number;
  detail: {
    subtotal: number;
    total: number;
    discountType: number;
    discountAmount: number;
    reference: string;
    tax: number;
  };
}
