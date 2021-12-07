export interface ItemDataType {
  id: number;
  name: string;
  addon_category_id: number;
  addon_category: ItemCategoryType;
  addon: any[];
  status: number;
  pax: string;
  total: string;
}

export interface ItemCategoryType {
  id: number;
  name: string;
}
