export interface CategoryData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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
