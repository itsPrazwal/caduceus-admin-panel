import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
  SelectOptionDataType
} from '../../../../Utils/types'
import { FieldTypeDepartmentCreate, FieldTypeDepartmentMain, FieldTypeDepartmentUpdate } from '../../../../Redux/Department/Types'

interface DiseaseAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateDepartmentDetails: Nullable<FieldTypeDepartmentMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeDepartmentCreate | FieldTypeDepartmentUpdate>>
  isSubmitting: boolean,
  diseaseList: SelectOptionDataType[]
}

const initialValues:FieldTypeDepartmentCreate = {
  name: '',
  relatedDiseases: []
}

export const DepartmentAddEditModal:FC<DiseaseAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateDepartmentDetails, handleCreateOrUpdate, isSubmitting, diseaseList }) => {

  const [formState, setFormState] = useState<FieldTypeDepartmentCreate | FieldTypeDepartmentUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateDepartmentDetails, [toUpdateDepartmentDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string | string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateDepartmentDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateDepartmentDetails){
      setFormState({
        name: toUpdateDepartmentDetails.name,
        relatedDiseases: toUpdateDepartmentDetails.relatedDiseases,
      })
    }
  }, [toUpdateDepartmentDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Department</Typography.Title>}
      closable={true}
      onCancel={closeModal}
      width={1000}
      footer={false}
      visible={modalVisibility}
      destroyOnClose={true}
      afterClose={() => setFormState(initialValues)}
    >
      <Form
        layout="vertical"
        name="departmentAddEditForm"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Department Name"
              name="name"
              rules={[{ required: true, message: 'Name of the department is required.' }]}
            >
              <Input name="name" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Related Diseases"
              name="relatedDiseases"
              rules={[{ required: true, message: 'At-least one related disease is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'relatedDiseases' })}
              >
                {diseaseList?.map((dl, i) => (
                  <Select.Option key={i} value={dl.value}>{dl.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Button type="link" onClick={()=>closeModal()}>Cancel</Button>
        <Button htmlType="submit" loading={isSubmitting} type="primary">{isUpdate ? isSubmitting ? 'Updating' : 'Update' : isSubmitting ? 'Creating' : 'Create'}</Button>
      </Form>
    </Modal>
  )
}


