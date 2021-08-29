import { labels } from './en'

const { strong, medium, enough } = labels.profile.passwordStrength

const passwordStrength = {
  [strong]: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
  [medium]: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  [enough]: `'(?=.{6,}).*', 'g'`
}

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

type validatePasswordReturnValues = undefined | keyof typeof passwordStrength

export const validatePassword = (password: string): validatePasswordReturnValues => {
  if (!password) {
    return
  }
  return (Object.keys(passwordStrength) as  Array<keyof typeof passwordStrength>).find(k => {
    return (new RegExp(passwordStrength[k])).test(password)
  })
}
