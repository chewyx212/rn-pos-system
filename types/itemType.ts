export interface ItemDataType {
  id: number;|
  name: string;
  price: number;
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
}

export interface ItemFromApi  {
  id: number;
  imageURL: string;
  image_url: {
    url: string;
    thumbnail: string;
    preview: string;
  };
  is_active: boolean | number;
  is_charity: boolean | number;
  is_veg: boolean | number;
  item_category_id: number;
  item_category_name: string;
  item_category_remark: string | null;
  name: string;
  order_number: number;
  price: number;
  addons: AddonType[];
}

export interface AddonType {
  addon_category: AddonCategoryType;
  addon_category_id: number;
  id: number;
  is_active: number|boolean
  name: string;
  price: number;
  restaurant_id: number;
}
export interface AddonCategoryType {
  id: number;
  name: string
  remark: string
  restaurant_id: number;
  type: number
}

export interface ItemInCartType extends ItemDataType {
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
}
