export interface Post {
  _id: string;
  name: string;
  description: string;
  status: string;
}



/** Dep */
export interface DepartmentType {
  _id: string;
  name: string;
  teams_count: number;
  head_of_dept: string;
  members_count: number;
  status: "active" | "pending"
}