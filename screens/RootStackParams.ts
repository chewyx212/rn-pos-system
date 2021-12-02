export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Passcode: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
  };
  Table: undefined;
  Printer: undefined;
  Camera: undefined;
};
