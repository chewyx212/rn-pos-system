export interface ItemDataType {
  id: number;
  name: string;
  image: any;
  desription: string;
  is_active: boolean;
  is_charity: boolean;
  is_new: boolean;
  is_popular: boolean;
  is_recommended: boolean;
  is_veg: boolean;
  orderStatus: number;
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
