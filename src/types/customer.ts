type CustomFields = {
    fieldNumber: number;
    value: string;
  };
  
  export type Customer = {
    CustomerID: string | null;
    CustomerNumber: number | null;
    CustomerName: string | null;
    Phone: string | null;
    CustomerTypeId: number | null;
    SalesmanId: number | null;
    Fax: string | null;
    Active: boolean | null;
    ParentCustomerNumber: number | string | null;
    Attention: string | null;
    DeliveryOption: number | null;
    Terms: number | null;
    Notes: string | null;
    Address: {
      Address1: string | null;
      Address2: string | null;
      City: string | null;
      State: string | null;
      Zip: string | null;
    } | null;
    CustomFields: CustomFields[] | null;
  };

  export type CustomerArray = {
    CustomerArray: Customer[] | null;
  };
  