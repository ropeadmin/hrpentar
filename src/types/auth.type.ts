export interface LoginRequest {
  email:    string
  password: string
}

export interface AdminBusinessData {
  id: string;
  logo: string;
}

export interface AdminData  {
  id?:       string
  email?:    string
  business: AdminBusinessData
}

export interface UserResponse {
  data:  {accessToken: string, adminData: AdminData}
}
