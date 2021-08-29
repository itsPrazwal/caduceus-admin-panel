import { NotifierTitle, ResetPasswordWorkingState } from './enums'

const notFound = {
  title: 'ERROR 404!',
  subTitle: 'OPPS! PAGE NOT FOUND',
  detail: 'Sorry, the page you are looking for does not exist. If you think something is broken report a problem.',
  redirection: {
    url: '/',
    displayName: 'RETURN HOME'
  },
  problemUrl: {
    url: '/',
    displayName: 'REPORT PROBLEM'
  }
}

const labels = {
  login: {
    title: 'LOG IN',
    text: 'Please enter you email and password to login.'
  },
  [ResetPasswordWorkingState.FORGOT]: {
    title: 'FORGOT PASSWORD',
    text: 'Please enter your email address to continue.'
  },
  [ResetPasswordWorkingState.OTP]: {
    title: 'ENTER OTP',
    text: 'Please enter otp sent to '
  },
  [ResetPasswordWorkingState.CHANGE]: {
    title: 'CHANGE PASSWORD',
    text: 'Please enter new and confirm password.'
  },
  profile:{
    passwordStrength: {
      strong: 'strong',
      medium: 'medium',
      enough: 'enough'
    }
  }
}

const error_messages = {
  generic: {
    message: 'Something went wrong',
    description: 'Internal Server Error',
  },
  default: {
    message: 'Failed - ~~~',
    description: 'Could not ~~~ at the moment'
  },
  invalid_user: {
    message: 'Invalid User',
    description: 'Please login to continue.'
  },
}

const success_messages = {
  [NotifierTitle.LOGIN]: { message: 'Logged in Successfully.', description: 'You have been logged in.' },
  [NotifierTitle.CHANGE_PASSWORD]: { message: 'Password Changed Successfully.', description: 'Your password has been changed.' },
  [NotifierTitle.SEND_EMAIL]: { message: 'Email sent Successfully.', description: 'Email has been sent to the provided mail address.' },
  [NotifierTitle.RESET_PASSWORD]: { message: 'Password reset Successfully.', description: 'Password has been reset. Please login to continue' },
}

export { notFound, labels, error_messages, success_messages }
