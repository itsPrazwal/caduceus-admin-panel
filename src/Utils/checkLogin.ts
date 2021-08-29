import { LocalStorageKeys } from './enums'

const loginExpired = err => {
  if (err.response) {
    if (err.response.status === 440) {
      localStorage.clear()
      document.location.reload()
      return true
    } else {
      return false
    }
  }else{
    return false
  }

}

const invalidUser = err => {
  if (err.response) {
    if (err.response.status === 401) {
      localStorage.clear()
      document.location.reload()
      return true
    } else {
      return false
    }
  }else{
    return false
  }
}

const validateLogin = (): boolean => {
  return !!(
    localStorage.getItem(LocalStorageKeys.TOKEN_1) &&
    localStorage.getItem(LocalStorageKeys.TOKEN_2) &&
    localStorage.getItem(LocalStorageKeys.TOKEN_3) &&
    localStorage.getItem(LocalStorageKeys.EXPIRY) &&
    localStorage.getItem(LocalStorageKeys.USER_ID)
  )
}

export { loginExpired, validateLogin,invalidUser }
