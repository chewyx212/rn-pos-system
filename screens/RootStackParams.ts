export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Passcode: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
    refresher: Function;
  };
  Table: undefined;
  TableList: undefined;
  Printer: undefined;
  Camera: undefined;
};
