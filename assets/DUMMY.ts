import { ItemDataType } from "./../types/itemType";
import { TableCategoryType, TableDataType } from "./../types/tableType";
export const itemData: ItemDataType[] = [
  {
    id: 1,
    name: "Coffee",
    price: "10.50",
    stock: null,
    orderStatus: 1,
    description: "Give Me Five",
    order_number: 2,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 1,
    is_veg: 1,
    is_charity: 1,
    restaurant_id: 1,
    item_category_id: 3,
    image: {
      id: 32,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/32/coffee.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/32/conversions/coffee-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/32/conversions/coffee-preview.jpg",
    },
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 2,
    name: "Cofeeeeee",
    price: "10.50",
    stock: null,
    orderStatus: 1,
    description: "",
    order_number: 1,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 2,
    image: {
      id: 252,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/252/mocha.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/252/conversions/mocha-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/252/conversions/mocha-preview.jpg",
    },
    item_category: {
      id: 2,
      name: "item category 2",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 3,
    name: "Item 3",
    price: "10.50",
    stock: null,
    orderStatus: 1,
    description: "",
    order_number: 5,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 2,
    image: null,
    item_category: {
      id: 2,
      name: "item category 2",
      order_number: 5,
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 4,
    name: "Item 4",
    price: "10.50",
    stock: null,
    orderStatus: 1,
    description: "",
    order_number: 4,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 3,
    image: null,
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 5,
    name: "Item 5",
    price: "10.50",
    stock: null,
    orderStatus: 1,
    description: "",
    order_number: 0,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 0,
    is_veg: 1,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 4,
    image: {
      id: 33,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/33/meat.png",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/33/conversions/meat-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/33/conversions/meat-preview.jpg",
    },
    item_category: {
      id: 4,
      name: "item category 4",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 1,
        name: "Pepsi",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 5, addon_id: 1 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 7,
    name: "mushroom soup",
    price: "12.00",
    stock: null,
    orderStatus: 1,
    description: "nice",
    order_number: 2,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 1,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 2,
    image: {
      id: 31,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/31/mushroom-soup-2.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/31/conversions/mushroom-soup-2-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/31/conversions/mushroom-soup-2-preview.jpg",
    },
    item_category: {
      id: 2,
      name: "item category 2",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 1,
        name: "Pepsi",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 7, addon_id: 1 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 9,
        name: "Box",
        price: "1.50",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 7, addon_id: 9 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 10,
        name: "No Box",
        price: "0.00",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 7, addon_id: 10 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 8,
    name: "213",
    price: "123.00",
    stock: null,
    orderStatus: 1,
    description: "123",
    order_number: 3,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 1,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 2,
    image: {
      id: 30,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/30/image3.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/30/conversions/image3-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/30/conversions/image3-preview.jpg",
    },
    item_category: {
      id: 2,
      name: "item category 2",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 9,
    name: "Testiing no image",
    price: "12.00",
    stock: null,
    orderStatus: 1,
    description: "123",
    order_number: 5,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 1,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 3,
    image: null,
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 3,
        name: "Coke",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 9, addon_id: 3 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 7,
        name: "Large",
        price: "1.50",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 9, addon_id: 7 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 8,
        name: "Small",
        price: "0.00",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 9, addon_id: 8 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 9,
        name: "Box",
        price: "1.50",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 9, addon_id: 9 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 10,
        name: "No Box",
        price: "0.00",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 9, addon_id: 10 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 10,
    name: "23",
    price: "1.97",
    stock: null,
    orderStatus: 1,
    description: "",
    order_number: 4,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 2,
    image: null,
    item_category: {
      id: 2,
      name: "item category 2",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 11,
    name: "Happy Meal",
    price: "9.99",
    stock: 123,

    orderStatus: 1,
    description: "<p>Happy meal with no toy :)</p>",
    order_number: 0,
    is_recommended: 1,
    is_active: 0,
    is_popular: 1,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 1,
    image: {
      id: 44,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/44/612ef41e4383c_merchant_product_mcd_happymeal.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/44/conversions/612ef41e4383c_merchant_product_mcd_happymeal-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/44/conversions/612ef41e4383c_merchant_product_mcd_happymeal-preview.jpg",
    },
    item_category: {
      id: 1,
      name: "item category 1 haha",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 1,
        name: "Pepsi",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 11, addon_id: 1 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 16,
    name: "Testname",
    price: "12.50",
    stock: null,

    orderStatus: 1,
    description: "Test",
    order_number: 1,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 3,
    image: null,
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 17,
    name: "TestName",
    price: "12.50",
    stock: null,

    orderStatus: 1,
    description: "Test Description",
    order_number: 2,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 3,
    image: {
      id: 251,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/251/photo_2021-05-31_15-59-35.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/251/conversions/photo_2021-05-31_15-59-35-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/251/conversions/photo_2021-05-31_15-59-35-preview.jpg",
    },
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
  {
    id: 18,
    name: "asd",
    price: "12.00",
    stock: null,

    orderStatus: 1,
    description: "123123",
    order_number: 1,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 0,
    is_veg: 1,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 10,
    image: {
      id: 258,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/258/meat.png",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/258/conversions/meat-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/258/conversions/meat-preview.jpg",
    },
    item_category: {
      id: 10,
      name: "A Testing Category",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 3,
        name: "Coke",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 18, addon_id: 3 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 7,
        name: "Large",
        price: "1.50",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 18, addon_id: 7 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 8,
        name: "Small",
        price: "0.00",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 18, addon_id: 8 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 22,
        name: "New Final ADdon",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 18, addon_id: 22 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 19,
    name: "Item Name",
    price: "10.00",
    stock: null,

    orderStatus: 1,
    description: "test addon",
    order_number: 1,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 1,
    is_charity: 1,
    restaurant_id: 1,
    item_category_id: 4,
    image: {
      id: 259,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/259/photo_2021-05-31_15-59-35.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/259/conversions/photo_2021-05-31_15-59-35-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/259/conversions/photo_2021-05-31_15-59-35-preview.jpg",
    },
    item_category: {
      id: 4,
      name: "item category 4",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 4,
        name: "Sky Juice",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 19, addon_id: 4 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 5,
        name: "Lemon Juice",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 19, addon_id: 5 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 6,
        name: "100 plus",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 19, addon_id: 6 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 7,
        name: "Large",
        price: "1.50",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 19, addon_id: 7 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 9,
        name: "Box",
        price: "1.50",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 19, addon_id: 9 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 20,
    name: "Final Item",
    price: "99.99",
    stock: null,

    orderStatus: 1,
    description: "final description",
    order_number: 3,
    is_recommended: 1,
    is_active: 1,
    is_popular: 1,
    is_new: 1,
    is_veg: 1,
    is_charity: 1,
    restaurant_id: 1,
    item_category_id: 3,
    image: {
      id: 260,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/260/Cul-BabyYoda_mandalorian-thechild-1_af408bfd.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/260/conversions/Cul-BabyYoda_mandalorian-thechild-1_af408bfd-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/260/conversions/Cul-BabyYoda_mandalorian-thechild-1_af408bfd-preview.jpg",
    },
    item_category: {
      id: 3,
      name: "item category 3",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [
      {
        id: 2,
        name: "7-up",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 2 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 3,
        name: "Coke",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 3 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 4,
        name: "Sky Juice",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 4 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 5,
        name: "Lemon Juice",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 5 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 6,
        name: "100 plus",
        price: "2.00",
        is_active: 1,
        addon_category_id: 1,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 6 },
        addon_category: {
          id: 1,
          name: "Drinks",
          type: "1",
          remark: "let drink",
          restaurant_id: 1,
        },
      },
      {
        id: 7,
        name: "Large",
        price: "1.50",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 7 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 8,
        name: "Small",
        price: "0.00",
        is_active: 1,
        addon_category_id: 2,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 8 },
        addon_category: {
          id: 2,
          name: "Size",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 9,
        name: "Box",
        price: "1.50",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 9 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
      {
        id: 10,
        name: "No Box",
        price: "0.00",
        is_active: 1,
        addon_category_id: 3,
        restaurant_id: 1,
        image: null,
        pivot: { item_id: 20, addon_id: 10 },
        addon_category: {
          id: 3,
          name: "Pack",
          type: "2",
          remark: null,
          restaurant_id: 1,
        },
      },
    ],
  },
  {
    id: 47,
    name: "hi",
    price: "0.00",
    stock: null,

    orderStatus: 1,
    description: "",
    order_number: 1,
    is_recommended: 0,
    is_active: 1,
    is_popular: 0,
    is_new: 0,
    is_veg: 0,
    is_charity: 0,
    restaurant_id: 1,
    item_category_id: 24,
    image: {
      id: 326,
      url: "https://menuworlds.s3.ap-southeast-1.amazonaws.com/326/Screenshot_2021-11-12-23-15-22-619_com.menuworlds.merchant.demo.jpg",
      thumbnail:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/326/conversions/Screenshot_2021-11-12-23-15-22-619_com.menuworlds.merchant.demo-thumb.jpg",
      preview:
        "https://menuworlds.s3.ap-southeast-1.amazonaws.com/326/conversions/Screenshot_2021-11-12-23-15-22-619_com.menuworlds.merchant.demo-preview.jpg",
    },
    item_category: {
      id: 24,
      name: "i",
      is_enabled: 1,
      restaurant_id: 1,
    },
    addons: [],
  },
];

export const tableData: TableDataType[] = [
  {
    id: 1,
    name: "T01",
    table_category_id: 1,
    table_category: { id: 1, name: "Floor 1" },
    status: 0,
    order: [],
    pax: 0,
    total: "0",
  },
  {
    id: 2,
    name: "T02",
    table_category_id: 2,
    table_category: { id: 2, name: "Floor 2" },
    status: 0,
    order: [],
    pax: 0,
    total: "0",
  },
  {
    id: 3,
    name: "T03",
    table_category_id: 3,
    table_category: { id: 3, name: "Floor 3" },
    status: 0,
    order: [],
    pax: 0,
    total: "0",
  },
  {
    id: 4,
    name: "T04",
    table_category_id: 1,
    table_category: { id: 1, name: "Floor 1" },
    status: 0,
    order: [],
    pax: 0,
    total: "0",
  },
];

export const tableCategoryData: TableCategoryType[] = [
  { id: 1, name: "Floor 1" },
  { id: 2, name: "Floor 2" },
  { id: 3, name: "Floor 3" },
  { id: 4, name: "Floor 4" },
  { id: 5, name: "Floor 5" },
];

const abc = [
  {
    detail: {
      discountAmount: 0,
      discountType: 1,
      reference: "",
      subtotal: 37.5,
      tax: 2.25,
      total: 39.75,
    },
    id: 1,
    items: [
      {
        addons: [],
        calculatedPrice: 12.5,
        description: "Test",
        id: 16,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 1,
        is_popular: 1,
        is_recommended: 1,
        is_veg: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Testname",
        orderStatus: 2,
        order_number: 1,
        price: "12.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 12.5,
        description: "Test",
        id: 16,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 1,
        is_popular: 1,
        is_recommended: 1,
        is_veg: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Testname",
        orderStatus: 2,
        order_number: 1,
        price: "12.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 12.5,
        description: "Test",
        id: 16,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 1,
        is_popular: 1,
        is_recommended: 1,
        is_veg: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Testname",
        orderStatus: 2,
        order_number: 1,
        price: "12.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
    ],
    orderIndex: 0,
    orderStatus: 2,
    orderType: 4,
  },
  {
    detail: {
      discountAmount: 30,
      discountType: 2,
      reference: "",
      subtotal: 46,
      tax: 2.76,
      total: 34.13,
    },
    id: 4,
    items: [
      {
        addons: [],
        calculatedPrice: 12.5,
        description: "Test",
        id: 16,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 1,
        is_popular: 1,
        is_recommended: 1,
        is_veg: 0,
        itemIndex: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Testname",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 1,
        price: "12.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 1,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 2,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        discountAmount: 0,
        discountType: 4,
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 3,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        reference: "",
        restaurant_id: 1,
        stock: null,
      },
    ],
    orderIndex: 2,
    orderStatus: 2,
    orderType: 3,
  },
  {
    detail: {
      discountAmount: 40,
      discountType: 2,
      reference: "",
      subtotal: 46,
      tax: 2.76,
      total: 17.65,
    },
    id: 5,
    items: [
      {
        addons: [],
        calculatedPrice: 12.5,
        description: "Test",
        id: 16,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 1,
        is_popular: 1,
        is_recommended: 1,
        is_veg: 0,
        itemIndex: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Testname",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 1,
        price: "12.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 1,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 2,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        itemIndex: 3,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderIndex: 1,
        orderStatus: 2,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
      {
        addons: [],
        calculatedPrice: 10.5,
        description: "",
        id: 4,
        image: null,
        is_active: 1,
        is_charity: 0,
        is_new: 0,
        is_popular: 0,
        is_recommended: 0,
        is_veg: 0,
        item_category: {
          id: 3,
          is_enabled: 1,
          name: "item category 3",
          restaurant_id: 1,
        },
        item_category_id: 3,
        name: "Item 4",
        orderStatus: 1,
        order_number: 4,
        price: "10.50",
        quantity: 1,
        restaurant_id: 1,
        stock: null,
      },
    ],
    orderIndex: 3,
    orderStatus: 1,
    orderType: 1,
    pax: 4,
    tableId: 1,
  },
];
