import { notification } from 'antd'
import { error_messages, success_messages } from '../en'
import { NotifierTitle, NotifierTitleType } from '../enums'
import { generateErrorMessage, generateSuccessMessage } from '../utilFunctions'
import { FunctionWithParam, NotifierObject } from '../types'

interface NotifierFunctionType {
  title: NotifierTitle,
  description?: string,
  type?: NotifierTitleType
}

const success:FunctionWithParam<NotifierFunctionType> = ({ type, description, title }) => {
  console.log('notifier', type)
  const notifierObj: NotifierObject = type
    ? generateSuccessMessage(title, type, description)
    : {
      message: success_messages[title].message,
      description: description || success_messages[title].description,
    }
  notification.success({
    ...notifierObj,
    placement: 'bottomRight',
  })
}

const error:FunctionWithParam<NotifierFunctionType> = ({ type, description, title }) => {
  notification.error({ ...generateErrorMessage(title, description, type), placement: 'bottomRight', })
}

const generic = (): void => {
  notification.error({
    message: error_messages.generic.message,
    description: error_messages.generic.description,
    placement: 'bottomRight',
  })
}
const invalidUser = (): void => {
  notification.error({
    message: error_messages.invalid_user.message,
    description: error_messages.invalid_user.description,
    placement: 'bottomRight',
  })
}

const notifier = {
  error,
  generic,
  success,
  invalidUser,
}

export { notifier }
