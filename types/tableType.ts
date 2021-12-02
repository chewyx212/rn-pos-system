export interface TableDataType {
  id: number;
  name: string;
  table_category_id: number;
  table_category: TableCategory;
  order: any[];
  status: number;
  pax: string;
  total: string;
}


export interface TableCategory {
    id: number;
    name: string
}