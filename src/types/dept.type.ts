export interface Post {
  _id: string;
  name: string;
  description: string;
  status: string;
}



/** Dep */
export interface DepartmentType {
  name: string;
  teams_count: string;
  head_of_dept: string;
  members_count: number;
  status: "active" | "pending"
}