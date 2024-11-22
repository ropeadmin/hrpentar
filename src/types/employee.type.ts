/** Dep */

interface JobTypeProps {
  title: string;
  type: string;
  status: "onboarding" | "pending" | "suspended" | "active";
}
export interface EmployeeType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  employe_id: string;
  job: JobTypeProps;
}

interface BenefitItem {
  percentage: string;
  frequency: string;
  maxPercentage: string;
}

interface SalaryFormData {
  paymentFrequency: string;
  paygradeTemplate: string;
  grossSalary: string;
  netSalary: string;
  benefits: {
    basicEarnings: BenefitItem;
    housing: BenefitItem;
    healthInsurance: BenefitItem;
    transportAllowance: BenefitItem;
    leaveAllowance: BenefitItem;
    thirteenthMonth: BenefitItem;
  };
}

export interface IEmployeeRequestProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO 8601 date string
  email: string;
  country: string;
  maritalStatus: string;
  gender: string;
  details: {
    type: string;
    department: string;
    role: string;
    cadre: string;
    lineManager: string;
    branch: string;
    employeeId: string;
    email: string;
    joinDate: string; // ISO 8601 date string
  };
  salary: {
    gross: string; // Currency formatted string
    net: string; // Currency formatted string
    pension: string; // Currency formatted string
    tax: string; // Currency formatted string
    allowance: string; // Currency formatted string
  };
  state: string;
  address: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  nationality: string;
  countryOfResidence: string;
  address: {
    country: string;
    state: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  education: {
    educationLevel: string;
    evidentOfEducation: string;
    certificate: string;
  };
  contract: {
    contractFirstName: string;
    contractLastName: string;
    phoneNumber: string;
    nextOfKin: {
      firstName: string;
      lastName: string;
      phone: string;
      relationship: string;
    };
  };
  jobDetails: {
    employmentType: string;
    department: string;
    employeeId: string;
    workEmail: string;
    jobTitle: string;
    jobCadre: string;
    reportTo: string;
    role: string;
    offDays: string[];
    workHourPerDay: string;
    branch: string;
    startDate: string;
    exitDate: string;
    status: string;
  };
  paymentDetails: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    paymentMethod: string[];
  };
  salary: SalaryFormData;
  document: {
    template: string;
  };
  assets: string[]
}

