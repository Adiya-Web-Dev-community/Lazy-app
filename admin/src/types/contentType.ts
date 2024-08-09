//category
import { Dispatch, SetStateAction } from "react";
export interface CategoryStateType {
  creat: boolean;
  updateId: string;
  updateData: string;
  updateImage: string;
}
export interface CategoryData {
  _id: string;
  name: string;
  image: string;
}

export interface CreatCategoryProps {
  setCategoryForm: Dispatch<SetStateAction<CategoryStateType>>;
  isCategoryForm: CategoryStateType;
  refetch: () => void;
}

export interface UpdateCatgeoryData {
  _id: string;
  name: string;
  image: string;
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

//form post put operation for category
export interface CategorySendingPostType {
  name: string;
  image: string;
}

export interface CategoryPostResponseDataType {
  name: string;
  image: string;
  _id: string;
}

export interface CategoryPostResponseType {
  success?: boolean;
  message?: string;
  data?: CategoryPostResponseDataType;
}

export interface MutationObjectCategoryType {
  path: string;
  condition: "creat" | "update";
  data: CategorySendingPostType;
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
  _id?: string;
  image?: string;
}

export type FormProductKeys = keyof FormProductTypes;

export interface ProductUni {
  name?: string;
  _id?: string;
  image?: string;
}
export interface CateUni {
  image?: string;
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
  feature?: string;
  available?: boolean;
  status?: string;
  productsLink?: ProductsLinkType[] | undefined;
}

//produt get data types
export interface ProductLinkType {
  url?: string;
  company?: string;
}
export interface CompanyType {
  name?: string;
  image?: string;
}
export interface ProductData {
  name?: string; //
  _id: string; //
  images?: string[]; //
  feature?: string; //
  description?: string; //
  // recommended?: boolean;
  // flashSale?: boolean;
  category?: string; //
  available?: boolean; //
  status?: string; //
  productsLink?: ProductLinkType[]; //
  company?: CompanyType[]; //
  createdAt: string; //
  updatedAt: string; //
  slice(
    indexOfFirstItem: number,
    indexOfLastItem: number
  ): ProductData | undefined;
  map: ProductData | undefined;
}
export interface ProductResponseData {
  data?: ProductData[];
}

export interface ProductDeleteStateType {
  delet: boolean;
  deletElementId: string;
}

//product post Data type

//response
export interface CompanyType {
  name?: string;
  image?: string;
  _id?: string;
}
export interface ProductLinkType {
  url?: string;
  company?: string;
  _id?: string;
}
export interface ProductLinkSentType {
  url?: string;
  company?: string;
}
export interface ProductPostResponseDataType {
  name?: string; //
  images?: string[]; //
  feature?: string; //
  description?: string; //
  category?: string; //
  available?: boolean; //
  status?: string; //
  productsLink?: ProductLinkType[]; //
  company?: CompanyType[]; //
  _id?: string; //
  createdAt?: string; //
  updatedAt?: string; //
}
export interface ProductPostResponseType {
  success?: boolean;
  message?: string;
  data?: ProductPostResponseDataType;
}

//passing data
export interface ProductSendingPostType {
  name?: string;
  images?: string[];
  status?: string;
  company?: CompanyType[];
  description?: string;
  category?: string;
  productsLink?: ProductLinkSentType[];
  feature?: string;
  available?: boolean;
}

export interface MutationObjectType {
  path: string;
  method: "put" | "post";
  data: ProductSendingPostType;
}

export interface StateOpenCloseType {
  company: boolean;
  category: boolean;
  status: boolean;
}

export type OptionValue = string | { name: string; id: string };

//product image types
export interface StateProps {
  image: string[];
  imageNames: string[];
}

// export interface FileUploadFormProps {
//   // setImageData: React.Dispatch<
//   //   React.SetStateAction<{
//   //     image: string[];
//   //     imageNames?: File[];
//   //   }>
//   // >;
//   setImageData: Dispatch<SetStateAction<FormProductTypes>>;
//   imge: string[];
//   productName: string;
// }

//Company get Data types
export interface CompanyData {
  name?: string; //
  _id?: string; //
  image?: string; //

  email?: string; //
  phone?: string; //

  address?: string; //
  status: string; //
  website?: string; //
  productcount?: number; //

  createdAt: string; //
  updatedAt: string; //
  slice(
    indexOfFirstItem: number,
    indexOfLastItem: number
  ): ProductData | undefined;
  map: ProductData | undefined;
}

export interface CompaniesType {
  name: string;
  email: string;
  phone: string | number;
  address: string;
  webLink: string;
  status: string;
  products: number;

  imageSrc: string;
  image: string;
}

export interface CompanyResponseData {
  data?: CompanyData[];
}

export interface CompanyDataUpdateType {
  address?: string;
  createdAt?: string;
  email?: string;
  image?: string;
  name?: string;
  phone?: number | string;
  productcount?: number;
  status?: string;
  updatedAt?: string;
  website?: string;
  _id?: string;
}

// export interface CompanyDataTypes {
//   name?: string;
//   email?: string;
//   phone?: string;
//   address?: string;//
//   webLink?: string;
//   status?: string;
//   products?: number;
//   joinDate?: string;
// }

export interface CompanySliceType {
  companyData?: CompanyDataUpdateType;
}

export interface RootState {
  company: CompanyDataUpdateType; // Assuming CompanyType represents your company slice state
  // Add other slices as needed, e.g., product: ProductType;
}

export interface CompanySendingPostTyp {
  name: string;
  email: string;
  phone: number | string;
  image?: string;

  address: string;
  website: string;
  status: string;
  productcount: number;
}

export interface CompanyPostResponseDataType {
  address: string;
  createdAt: string;
  email: string;
  image: string;
  name: string;
  phone: number;
  productcount: number;
  status: string;
  updatedAt: string;
  website: string;
  _id: string;
}

export interface CompanyPostResponseType {
  success?: boolean;
  message?: string;
  data?: CompanyPostResponseDataType;
}

export interface MutationObjectCompanyType {
  path: string;
  condition: "creat" | "update";
  data: CompanySendingPostTyp;
}

//pagination
export interface PaginationProps<T> {
  currentPage: number;
  apiData: T[];
  itemsPerPage: number;
  handleClick: (pageNumber: number) => void;
}

export interface SideBarPropsType {
  isOpen: {
    large: boolean;
    small: boolean;
  };
  onToggleSidebarLarge: () => void;
  onToggleSidebarSmall: () => void;
}

//header
export interface HeaderProps {
  onToggleSidebarSmall: () => void;
  isOpen: {
    large: boolean;
    small: boolean;
  };
}

export interface UserProfileDataType {
  createdAt: string;
  email: string;
  image: string;
  isVerify: boolean;
  mobile: number;
  name: string;
  role: string;
  updatedAt: string;

  _id: string;
}

export interface UserResponseType {
  success: boolean;
  data: UserProfileDataType;
}

export interface LogOutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export interface InformAleartModalProps {
  onClose: () => void;
}

export interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
export interface ConfirmDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

//multipleImages OR single uploade image firebase
export interface UploadImageFunction {
  (
    folderName: string,
    file: File,
    setProgressStatus: Dispatch<SetStateAction<number | null>>
  ): Promise<string>;
}

//Text Editor
export interface Meta {
  filetype?: string;
  fieldname?: string;
}

export type Callback = (url: string, meta: { title: string }) => void;

//Blog Category
export interface CategoryGetData {
  _id: string;
  name: string;
  image: string;
}

// Blog
export interface BrandType {
  name: string;
  image: string;
  link: string;
}
//get type
export interface BlogData {
  _id: string;
  thumnail: string[];
  title: string;
  slug: string;
  category: string;
  content: string;
  brand: BrandType;
  updatedAt: string;
  createdAt: string;
}

export interface BlogResponseData {
  data?: BlogData[];
}

//getting response after sending data on backend
export interface BlogPostResponseType {
  success?: boolean;
  message?: string;
  data?: BlogData;
}

/// for sending data on backend
export interface BlogPostType {
  thumnail: string[];
  title: string;
  slug: string;
  category: string;
  content: string;
  brand: BrandType;
}
export interface MutationObjectBlogType {
  path: string;
  condition: "creat" | "update";
  data: BlogPostType;
}

//blog form state
export interface BlogStateType {
  title: string;
  category: string;
  content: string;
  brandName: string;
  webLink: string;
  imageSrc: string;
  image: string;
  thumnail: string[];
}

//blog Reviwe

//get
export interface BlogReviewType {
  _id: string;
  blogId: string;
  name: string;
  email: string;
  star: number;
  isVerify: boolean;
}

export interface BlogResponseGetType {
  data: BlogReviewType[];
}

//verified
export interface VerifiedElementDataType {
  success: boolean;
  message: string;
}

//providing props data for delet api
export interface VerifyPathType {
  path: string;
}

//Info

//Info state
export interface InfoGuidStateType {
  creat: boolean;
  updateId: string;
  updateTitle: string;
  updateThumnail: string;
  updateVideo: string;
}

//form props typpes
export interface InfoGuidProps {
  formHandler: Dispatch<SetStateAction<InfoGuidStateType>>;
  infoFormData: InfoGuidStateType;
  refetch: () => void;
}

//post
export interface InfoGuidPostType {
  title: string;
  thumnail: string;
  videourl: string;
}
// export interface CategorySendingPostType {
//   name: string;
//   image: string;
// }
// export interface CategoryPostResponseDataType {
//   name: string;
//   image: string;
//   _id: string;
// }

//use for mutation type defination
export interface InfoGuidePostResponseType {
  success?: boolean;
  message?: string;
  data?: InfoGuidGetType;
}
export interface MutationObjectInfoGuideType {
  path: string;
  condition: "creat" | "update";
  data: InfoGuidPostType;
}

//Get
export interface InfoGuidGetType extends InfoGuidPostType {
  _id: string;
}
// export interface InfoGuidGetResponseType {
//   data: InfoGuidGetType[];
// }
