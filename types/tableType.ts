export interface TableDataType {
  id: number;
  name: string;
  table_category_id: number;
  table_category: TableCategoryType;
  order: any;
  status: number;
  pax: number;
  total: string;
}


export interface TableCategoryType {
    id: number;
    name: string
}