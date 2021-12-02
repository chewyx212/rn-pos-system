export interface ItemDataType {
  id: number;
  name: string;
  table_category_id: number;
  table_category: TableCategory;
  order: any[];
  status: number;
  pax: string;
  total: string;
}

export interface ItemCategoryType {
  id: number;
  name: string;
}
