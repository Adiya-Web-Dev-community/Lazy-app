import { ApiError, ApiGetResponse } from "../types/apiType";
import {
  BlogResponseData,
  CategoryGetData,
  CategoryResponseData,
  CompanyResponseData,
  FaqGetResponseType,
  InfoGuidGetType,
  ProductData,
  FaqSingleGetResponseType,
  ProsConsResponseData,
  ProsConsSingleResponseData,
  SinglBlogResponseData,
  BlogReviewType,
  PostCategoryResponseData,
  TransactionResponse,
  TransactionSingleResponse,
  ClaimGet,
} from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";
import { useQuery } from "@tanstack/react-query";

//blog
export const useBlog = () => {
  return useQuery<ApiGetResponse<BlogResponseData>, ApiError>({
    queryKey: ["blog"],
    queryFn: async () => {
      return await apiGetRequest<BlogResponseData>({
        url: "api/blog",
      });
    },
  });
};

//single blog
export const useSingleBlog = (id: string) => {
  return useQuery<ApiGetResponse<SinglBlogResponseData>, ApiError>({
    queryKey: [`singleblog/${id}`],
    queryFn: async () => {
      return await apiGetRequest<SinglBlogResponseData>({
        url: `api/blog/${id}`,
      });
    },
  });
};

//blog category
export const useBlogCategory = () => {
  return useQuery<ApiGetResponse<CategoryGetData[]>, ApiError>({
    queryKey: ["blog-category"],
    queryFn: async () => {
      return await apiGetRequest<CategoryGetData[]>({
        url: "api/blog/all/category",
      });
    },
  });
};

//blog-review
export const useBlogReview = () => {
  return useQuery<ApiGetResponse<BlogReviewType[]>, ApiError>({
    queryKey: ["blogReview"],
    queryFn: async () => {
      return await apiGetRequest<BlogReviewType[]>({
        url: "api/blog/review",
      });
    },
  });
};

//category
export const useCategories = () => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: ["category"],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: "api/admin/category",
      });
    },
  });
};

//single Category
export const useSingleCategories = (id: string) => {
  return useQuery<ApiGetResponse<ProductData[]>, ApiError>({
    queryKey: [`category/${id}`],
    queryFn: async () => {
      return await apiGetRequest<ProductData[]>({
        url: `api/product/bycategory/${id}`,
      });
    },
  });
};

//company
export const useCompanies = () => {
  return useQuery<ApiGetResponse<CompanyResponseData>, ApiError>({
    queryKey: ["company"],
    queryFn: async () => {
      return await apiGetRequest<CompanyResponseData>({
        url: "api/company",
      });
    },
  });
};

//info guide
export const useInfoGuide = () => {
  return useQuery<ApiGetResponse<InfoGuidGetType[]>, ApiError>({
    queryKey: ["infoGuide"],
    queryFn: async () => {
      return await apiGetRequest<InfoGuidGetType[]>({
        url: "api/infoguide",
      });
    },
  });
};

//product
export const useProduct = () => {
  return useQuery<ApiGetResponse<ProductData[]>, ApiError>({
    queryKey: ["product"],
    queryFn: async () => {
      return await apiGetRequest<ProductData[]>({
        url: "api/product",
      });
    },
  });
};

//product profile
export const useProductProfile = (id: string) => {
  return useQuery<ApiGetResponse<ProductData>, ApiError>({
    queryKey: [`single_product/${id}`],
    queryFn: async () => {
      return await apiGetRequest<ProductData>({
        url: `api/product/${id}`,
      });
    },
  });
};

//Pros and cons
export const useProsCons = () => {
  return useQuery<ApiGetResponse<ProsConsResponseData>, ApiError>({
    queryKey: ["proscons"],
    queryFn: async () => {
      return await apiGetRequest<ProsConsResponseData>({
        url: "api/proscons",
      });
    },
  });
};

//pros and cons single profile
export const useProsConsSingle = (id: string) => {
  return useQuery<ApiGetResponse<ProsConsSingleResponseData>, ApiError>({
    queryKey: ["singleproscons", id],
    queryFn: async () => {
      return await apiGetRequest<ProsConsSingleResponseData>({
        url: `api/proscons/${id}`,
      });
    },
  });
};

//Faq
export const useFaq = () => {
  return useQuery<ApiGetResponse<FaqGetResponseType>, ApiError>({
    queryKey: ["faq"],
    queryFn: async () => {
      return await apiGetRequest<FaqGetResponseType>({
        url: "api/faq",
      });
    },
  });
};

//single Faq profile
export const useSingleFaq = (id: string) => {
  return useQuery<ApiGetResponse<FaqSingleGetResponseType>, ApiError>({
    queryKey: [`singlefaq/${id}`],
    queryFn: async () => {
      return await apiGetRequest<FaqSingleGetResponseType>({
        url: `api/faq/${id}`,
      });
    },
  });
};

//Post category
export const usePostCategories = () => {
  return useQuery<ApiGetResponse<PostCategoryResponseData>, ApiError>({
    queryKey: ["post-category"],
    queryFn: async () => {
      return await apiGetRequest<PostCategoryResponseData>({
        url: "api/admin/post/category",
      });
    },
  });
};
//Transection

////get all
export const useTransaction = () => {
  return useQuery<ApiGetResponse<TransactionResponse>, ApiError>({
    queryKey: ["Transaction"],
    queryFn: async () => {
      return await apiGetRequest<TransactionResponse>({
        url: "api/transaction",
      });
    },
  });
};

////get single
export const useSingleTransaction = (id: string) => {
  return useQuery<ApiGetResponse<TransactionSingleResponse>, ApiError>({
    queryKey: [`Transaction/${id}`],
    queryFn: async () => {
      return await apiGetRequest<TransactionSingleResponse>({
        url: `api/transaction/single/admin/${id}`,
      });
    },
  });
};

//Claim
export const useClaims = () => {
  return useQuery<ApiGetResponse<ClaimGet[]>, ApiError>({
    queryKey: ["Claim"],
    queryFn: async () => {
      return await apiGetRequest<ClaimGet[]>({
        url: "api/claim",
      });
    },
  });
};
