export interface signupResponse {
  data: {
    business: {
      id: string
      logo: string
    };
    accessToken: string | null;
  }
}

export interface signupRequest {
  businessId?: string;
  businessSize?: string;
  payDay?: string;
  businessType?: string;
  allowBorrowAsYouEarn?: boolean;
  allowTermLoan?: boolean;
}