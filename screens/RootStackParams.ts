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
  TableEdit: undefined;
  Printer: undefined;
  Camera: undefined;
};
