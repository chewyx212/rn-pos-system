export interface ItemDataType {
  id: number;
  name: string;
  price: string | number;
  stock: null | number;
  image: any;
  description: string;
  order_number: number;
  is_active: boolean | number;
  is_charity: boolean | number;
  is_new: boolean | number;
  is_popular: boolean | number;
  is_recommended: boolean | number;
  is_veg: boolean | number;
  orderStatus: number;
  restaurant_id: number;
  item_category_id: number;
  item_category: ItemCategoryType;
  addons: any[];
  orderIndex?: number;
  itemIndex?: number;
}

export interface ItemCategoryType {
  id: number;
  name: string;
  is_enabled: boolean | number;
  restaurant_id: number;
}
