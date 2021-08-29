import { NotifierTitle } from './enums'
import { error_messages } from './en'
import { ErrorObject } from './types'
import moment, { Moment } from 'moment'

export const generateErrorMessage = (title: NotifierTitle, description?: string): ErrorObject => ({
  message: error_messages.default.message.replace('~~~', title),
  description: description || error_messages.default.description.replace('~~~', title)
})

export const disableDate =
    (current: Moment): boolean =>
      current && current < moment().subtract(1, 'days').endOf('day')

export const getRange = (start: number, end: number): number[] => {
  const result:number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
