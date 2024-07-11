export interface CategoryData {
  _id: string;
  name: string;
}

export interface CategoryResponseData {
  data: CategoryData[];
}
export interface SingleCategoryData {
  _id: string;

  name: string;

  createdAt: string;
  updatedAt: string;
}

export interface SingleCategoryResponseData {
  data: SingleCategoryData;
}

//delet respose category type

//response data for Every Delet Operation
export interface DeletElementData {
  success: boolean;
  message: string;
}

//providing props data for delet api
export interface UniDelet {
  path: string;
}

export interface CategoryDeletObject {
  deletObj: UniDelet;
}

//update or creat category
//response data for creat
//response data fro update

//providing props data for creat api
export interface CreatCategoryObject {
  name: string;
  type: string;
}
//providing props data for update api
export interface CreatCategoryObject {
  name: string;
  type: string;
}

//company
// export interface CompanyUni {
//   name: string;

// }

//products
export interface PlatformTypes {
  icons?: "";
}

export interface CompanyType {
  name?: string;
  id?: string;
  image?: "";
}

export type FormProductKeys = keyof FormProductTypes;

export interface ProductUni {
  name?: string;
  id?: string;
  image?: string;
}
export interface CateUni {
  name?: string;
  id?: string;
}

export interface ProductsLinkType {
  id?: string;
  url?: string;
  company?: CateUni;
}

export interface FormProductTypes {
  description?: string;
  imageSrc?: string;
  image?: string[];

  name?: string;
  price?: number;

  company?: CompanyType[] | undefined;

  category?: {
    name?: string;
    id?: string;
  };
  feature: string;
  available?: boolean;
  status?: string;
  productsLink?: ProductsLinkType[] | undefined;
}
