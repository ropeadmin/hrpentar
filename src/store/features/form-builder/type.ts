export type FormApiResponseType = {
  status: "SUCCESS" | "FAILURE";
  data: FormDataTableType[];
};

export type FormDataType = {
  _id: string;
  account: string;
  admin: string;
  title: string;
  description: string;
  sections: SectionDataType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FormDataTableType = FormDataType & {
 status: "upcoming" | "pending" | "active"
};

type SectionDataType = SectionType & {
    sectionId: string;
    inputs: InputDataType[];
    createdAt: string;
    updatedAt: string;
};


type InputDataType = InputType & {
  inputId: string;
  createdAt: string;
  updatedAt: string;
};

export type FormType = {
  title: string;
  description: string;
  sections: SectionType[];
};

export type SectionType = {
  title: string;
  description: string;
  inputs: InputType[];
};

export type InputType = {
  id: string;
  type: string;
  label: string;
  settings: InputSettings;
};

export type InputSettings = {
  required?: boolean;
  [key: string]: any; 
};
