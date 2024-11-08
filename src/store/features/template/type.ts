export type TemplateRequestType = {
  name: string;
  forms: string[];
};

export type TemplateResponseType = {
  status: "SUCCESS" | "FAILURE";
  data: TemplateDataType[];
};

type TemplateDataType = {
  _id: string;
  forms: string[];
  account: string;
  admin: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  shareCount: number;
};
