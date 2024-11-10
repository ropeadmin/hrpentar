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