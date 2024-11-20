import { z } from "zod";

// Define sub-schemas first
const addressSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().optional(),
});

const educationSchema = z.object({
  educationLevel: z.string().optional(),
  evidentOfEducation: z.string().optional(),
  certificate: z.string().optional(),
});

const nextOfKinSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  relationship: z.string().optional(),
});

const contractSchema = z.object({
  contractFirstName: z.string().optional(),
  contractLastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  nextOfKin: nextOfKinSchema,
});

const jobDetailsSchema = z.object({
  employmentType: z.string().optional(),
  department: z.string().optional(),
  employeeId: z.string().optional(),
  workEmail: z.string().email().optional(),
  jobTitle: z.string().optional(),
  jobCadre: z.string().optional(),
  reportTo: z.string().optional(),
  role: z.string().optional(),
  offDays: z.array(z.string()).optional(),
  workHourPerDay: z.string().optional(),
  branch: z.string().optional(),
  startDate: z.string().optional(),
  exitDate: z.string().optional(),
  status: z.string().optional(),
});

const paymentDetailsSchema = z.object({
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  bankName: z.string().optional(),
  paymentMethod: z.array(z.string()).optional(),
});

const MAX_NET_SALARY = 12000000;

const salarySchema = z.object({
  paymentFrequency: z.string().min(1, { message: "Payment frequency is required" }),
  paygradeTemplate: z.string().min(1, { message: "Payment template is required" }),
  grossSalary: z.string().optional(),
  netSalary: z.string()
    .min(1, { message: "Net salary is required" })
    .refine((value) => parseFloat(value) <= MAX_NET_SALARY, {
      message: "The net amount inputted is higher than the limit set for the selected paygrade.",
    }),
});

// Main form schema
export const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  middleName: z.string().optional(),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required!",
  }),
  maritalStatus: z.string().optional(),
  religion: z.string().optional(),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  countryOfResidence: z.string().min(1, { message: "Country of residence is required" }),
  address: addressSchema,
  education: educationSchema,
  contract: contractSchema,
  jobDetails: jobDetailsSchema,
  paymentDetails: paymentDetailsSchema,
  salary: salarySchema,
});

export const defaultAddress: Address = {
  country: "",
  state: "",
  address: "",
  city: "",
  postalCode: "",
};

export const defaultEducation: Education = {
  educationLevel: "",
  evidentOfEducation: "",
  certificate: "",
};

export const defaultContract: Contract = {
  contractFirstName: "",
  contractLastName: "",
  phoneNumber: "",
  nextOfKin: {
    firstName: "",
    lastName: "",
    phone: "",
    relationship: "",
  },
};

export const defaultJobDetails: JobDetails = {
  employmentType: "",
  department: "",
  employeeId: "",
  workEmail: "",
  jobTitle: "",
  jobCadre: "",
  reportTo: "",
  role: "",
  offDays: [],
  workHourPerDay: "",
  branch: "",
  startDate: "",
  exitDate: "",
  status: "",
};

export const defaultPaymentDetails: PaymentDetails = {
  accountNumber: "",
  accountName: "",
  bankName: "",
  paymentMethod: [],
};

export const defaultSalary: Salary = {
  paymentFrequency: "",
  paygradeTemplate: "",
  grossSalary: "",
  netSalary: "",
};

// Export the type
export type FormData = z.infer<typeof formSchema>;

// You can also export individual types if needed
export type Address = z.infer<typeof addressSchema>;
export type Education = z.infer<typeof educationSchema>;
export type NextOfKin = z.infer<typeof nextOfKinSchema>;
export type Contract = z.infer<typeof contractSchema>;
export type JobDetails = z.infer<typeof jobDetailsSchema>;
export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;
export type Salary = z.infer<typeof salarySchema>;