export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Passcode: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
    refreshCount: number;
  };
  Table: {
    refreshCount: number;
  };
  Printer: undefined;
  Camera: undefined;
};
