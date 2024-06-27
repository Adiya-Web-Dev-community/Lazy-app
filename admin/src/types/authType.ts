//login types

//for login sending data
export interface LoginData {
  email: string;
  password: string;
}

//type data which will come after login
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  role: string;
}

export interface LoginResponseData {
  data: LoginResponse;
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

export interface ForgotPasswordResponseData {
  data: ForgotPasswordResponse;
}

//register type
export interface RegisterData {
  name: string;
  password: string;
  email: string;
  mobile: string;
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

// export interface RegisterResponseData {
//   data: RegisterResponse;
// }

//Otp verification

export interface OtpVerificationData {
  email: string;
  otp: number;
}
export interface OtpVerificationResponse {
  success: boolean;
  message: string;
}
