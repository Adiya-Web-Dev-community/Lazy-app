//login types

//for login sending data
export interface LoginData {
  email: string;
  password: string;
}

//type data which will come after login
export interface LoginApiResponse {
  success?: boolean;
  message?: string;
}

export interface MutationObjectLoginType {
  path: string;
  method: "post";
  data: LoginData;
}

//forgot Password type
export interface ForgotPasswordData {
  email: string;
}

//type data which will come after forgot
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// export interface ForgotPasswordResponseData {
//   data: ForgotPasswordResponse;
// }

export interface MutationObjectForgotType {
  path: string;
  method: "post";
  data: ForgotPasswordData;
}

//register type
export interface RegisterData {
  name: string;
  password: string;
  email: string;
  mobile: number | string;
  role: string;
}

export interface MutationObjectRegisterType {
  path: string;
  method: "post";
  data: RegisterData;
}

export interface RegisterResponseChildData {
  name?: string;
  email?: string;
  password?: string;
  mobile?: number;
  isVerified?: boolean;
  role?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

//type data which will come after register
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterResponseChildData;
}

export interface RegisterStateType {
  fullName: string;
  contact: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VisiblePassType {
  enterPass: boolean;
  confPass: boolean;
}

// export interface RegisterResponseData {
//   data: RegisterResponse;
// }

//Otp verification

export interface OtpVerificationData {
  email: string;
  otp: number;
}

export interface MutationObjectOtpType {
  path: string;
  method: "post";
  data: OtpVerificationData;
}

export interface OtpApiResponse {
  success?: boolean;
  message?: string;
  token?: string;
}

//update
export interface UpdateSendingPostType {
  name: string;
  image: string;
  mobile: string | number;
}

export interface UpdatePutReponseDataType {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  isVerify: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface UpdatePutResponseType {
  success: boolean;
  message: string;
  data: UpdatePutReponseDataType;
}

export interface MutationObjectUPType {
  path: string;
  method: "put";
  data: UpdateSendingPostType;
}

//verifyEmailResetPass
export interface StateResteProp {
  newPassword: string;
  confirmPassword: string;
  otp: string;
  email: string;
}
export interface CheckingPassProp {
  confirmPasswordMsg: string;
}
export interface PassVisibleProp {
  oldPass: boolean;
  enterPass: boolean;
  confPass: boolean;
}

//otp verification

export interface UserOtpState {
  email: string;
  otp: number;
}

//Verify Email ResetPassword
export interface RegisterResponseChildData {
  name?: string;
  email?: string;
  password?: string;
  mobile?: number;
  isVerified?: boolean;
  role?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

//type data which will come after register
export interface ResetPassResponse {
  success: boolean;
  message: string;
  // data: RegisterResponseChildData;
}

export interface ResetPasswordData {
  newPassword: string;
  otp: number | string;
  email: string;
}

export interface MutationObjectResetPassType {
  path: string;
  method: "post";
  data: ResetPasswordData;
}
