export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Passcode: undefined;
  Home: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
    orders?: any[];
    refresher: Function;
  };
  Table: undefined;
  Printer: undefined;
  Camera: undefined;
  Member: undefined;
  Menu: undefined;
  Transaction: undefined;
  Report: undefined;
  Setting: undefined;
  Payment: {
    order: any;
    refresher: Function;
  };

  TableSetting: undefined;
  TableCategorySetting: undefined;
  GlobalSetting: undefined;
  StaffSetting: undefined;
  AccountSetting: undefined;
};
