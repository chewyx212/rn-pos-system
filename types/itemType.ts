export interface ItemType {
  id: number;
  imageURL: string;
  image_url: {
    url: string;
    thumbnail: string;
    preview: string;
  };
  is_recommended: boolean | number;
  is_active: boolean | number;
  is_charity: boolean | number;
  is_new: boolean | number;
  is_popular: boolean | number;
  is_veg: boolean | number;
  item_category_id: number;
  item_category_name: string;
  item_category_remark: string | null;
  restaurant_id: number;
  name: string;
  orderStatus: number;
  order_number: number;
  price: number;
  is_stock_check: boolean | number;
  stock_minimum: null | number;
  stock: null | number;
  addons: AddonType[];
}

export interface EditItemForm {
  stock: number;
}

export interface EditItemType extends EditItemForm {
  id: number;
}

export interface AddonType {
  addon_category: AddonCategoryType;
  addon_category_id: number;
  id: number;
  is_active: number | boolean;
  name: string;
  price: number;
  restaurant_id: number;
}
export interface AddonCategoryType {
  id: number;
  name: string;
  remark: null | string;
  restaurant_id: number;
  type: number;
}

export interface ItemInCartType extends ItemType {
  quantity: number;
  orderIndex?: number;
  calculatedPrice: number;
  itemIndex: number;
  discountType: number;
  discountAmount: number;
  reference: string;
}

export interface ItemCategoryType {
  id: number;
  name: string;
  is_enabled: boolean | number;
}

export interface OrderDetailType {
  subtotal: number;
  total: number;
  discountType: number;
  discountAmount: number;
  reference: string;
  tax: number;
  paid: number;
}
