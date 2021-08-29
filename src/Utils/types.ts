import { Action } from 'redux'

/** A high-level generic object. */
export type GenericObject<T = unknown> = { [key: string]: T }

/** A high-level error object. */
export interface ErrorObject {
    message: string,
    description: string,
}

/** Generic type to allow null. */
export type Nullable<T> = T | null

/** Function with single parameter returning void*/
export type FunctionWithParam<T> = (p: T) => void

/** Function with single parameter returning void*/
export type FunctionWithNoParam = () => void

/** Interface for reducer action with payload*/
export interface ReducerActionType<T = any, X = unknown> extends Action{
    /*eslint-disable*/
    payload?: T,
    response?: X,
    error?: ErrorObject
}

/** Interface for common form submit parameters */
export interface FormSubmitParameters<T> {
    isUpdate: boolean,
    values: T
}

/** Interface for common reducer state */
export interface CommonReducerState {
    message?: string;
    error: Nullable<ErrorObject>;
}

/** Interface for select option data format */
export interface SelectOptionDataType {
    name: string,
    value: string,
    enabled?: boolean,
}

/** Object having Form data with file */
export interface FormDataWithFile<T> {
    formValues: T,
    contentFile: Nullable<File | ContentFileWithLabel[]>
}

export interface ContentFileWithLabel {
    file: File,
    index: number,
}

/** COMPONENT TYPES */
export interface LoginFieldType {
    email: string,
    password: string,
}

export interface ForgotPasswordFieldType {
    email: string,
}

export interface ResetPasswordFieldType {
    email: string,
    otp: string,
    password: string,
}

export interface ChangePasswordFieldType {
    oldPassword: string,
    password: string,
}

export interface CompleteNewPasswordFieldType {
    user: GenericObject,
    password: string,
}

interface SideMenuItems {
    label: string,
    path: string,
    icon: any,
    key: string,
}

export interface SideMenuProps extends SideMenuItems{
    subMenu: SideMenuItems[] | []
}
