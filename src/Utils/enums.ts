export enum ScreenSizes {
  MOBILE = 640,
  TABLET = 768,
  LARGE_TABLET = 1024,
  DESKTOP = 1280,
  LARGE_DESKTOP = 1440,
}

export enum ResetPasswordWorkingState{
  FORGOT = 'forgotPassword',
  OTP = 'otp',
  CHANGE = 'changePassword',
}

export enum NotifierTitle{
  GENERIC = 'generic',
  LOGIN = 'login',
  CHANGE_PASSWORD = 'change password',
  SEND_EMAIL = 'send email',
  RESET_PASSWORD = 'reset password',
  LOG_OUT = 'log out',
}

export enum OperationStatus{
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export enum LocalStorageKeys {
  TOKEN_1='uni',
  TOKEN_2='cov',
  TOKEN_3='lod',
  EXPIRY='uep',
  USER_ID='uri'
}
