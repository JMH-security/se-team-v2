type Employee = {
  classificationId: number | null;
  locationId: number | null;
  phone1: string | null;
  phone1DescriptionId: number | null;
  phone1Extension: string | null;
  phone2: string | null;
  phone2DescriptionId: number | null;
  phone2Extension: string | null;
  phone3: string | null;
  phone3DescriptionId: number | null;
  phone3Extension: string | null;
  hireDate: string | null;
  birthDate: string | null;
  payCheckDistributionType: number | null;
  typeId: number | null;
  typeDescription: string | null;
  payCheckFrequencyId: number | null;
  ethnicityId: number | null;
  genderId: number | null;
  primaryJob: string | null;
  notes: null;
  dateAdded: string | null;
  securityLevel: number | null;
  accrualTypeId: number | null;
  isSupervisor: false;
  statusId: number | null;
  statusDescription: string | null;
  companyNumber: number | null;
  title: boolean | null;
  supervisorId: number | null;
  supervisorDescription: string | null;
  integrations: string | null;
  directDepositThirdParty: boolean | null;
  employeeNumber: number;
  employeeId: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  userName: string | null;
  partialSSN: number | null;
  address: {
    latitude: string | null;
    longitude: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: number | null;
  };
  physicalAddress: {
    latitude: string | null;
    longitude: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: number | null;
  };
};

type EmployeeResponse = {
  pageNumber: number | null;
  pageSize: number | null;
  totalPages: number | null;
  totalCount: number | null;
  results: Employee[];
  success: boolean | null;
  serverResponse: string | null;
};

type Data = {
  data: EmployeeResponse[];
};

export type { Data, EmployeeResponse, Employee };
