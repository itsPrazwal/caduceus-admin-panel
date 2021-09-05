import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../../../Utils/types'
import { FieldTypeBloodBankCreate, FieldTypeBloodBankMain, FieldTypeBloodBankUpdate } from '../../../../Redux/BloodBank/Types'

interface DiseaseAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateBloodBankDetails: Nullable<FieldTypeBloodBankMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeBloodBankCreate | FieldTypeBloodBankUpdate>>
  isSubmitting: boolean,
}

const initialValues:FieldTypeBloodBankCreate = {
  bloodBankName: '',
  address: '',
  email: '',
  numbers: []
}

export const BloodBankAddEditModal:FC<DiseaseAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateBloodBankDetails, handleCreateOrUpdate, isSubmitting }) => {

  const [formState, setFormState] = useState<FieldTypeBloodBankCreate | FieldTypeBloodBankUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateBloodBankDetails, [toUpdateBloodBankDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateBloodBankDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateBloodBankDetails){
      setFormState({
        bloodBankName: toUpdateBloodBankDetails.bloodBankName,
        address: toUpdateBloodBankDetails.address,
        email: toUpdateBloodBankDetails.email,
        numbers: toUpdateBloodBankDetails.numbers
      })
    }
  }, [toUpdateBloodBankDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Blood Bank</Typography.Title>}
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
        name="bloodBankAddEditForm"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Blood Bank Name"
              name="bloodBankName"
              rules={[{ required: true, message: 'Name of the blood bank is required.' }]}
            >
              <Input name="bloodBankName" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact Number"
              name="numbers"
              rules={[{ required: true, message: 'At-least one number is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string[]) => handleSelectChange({ value, name:'numbers' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email Address"
              name="email"
            >
              <Input name="email" onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
            >
              <Input name="address" onChange={handleInputChange}/>
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


