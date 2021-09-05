import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../../../Utils/types'
import { FieldTypeAmbulanceCreate, FieldTypeAmbulanceMain, FieldTypeAmbulanceUpdate } from '../../../../Redux/Ambulance/Types'

interface AmbulanceAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateAmbulanceDetails: Nullable<FieldTypeAmbulanceMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeAmbulanceCreate | FieldTypeAmbulanceUpdate>>
  isSubmitting: boolean,
}

const initialValues:FieldTypeAmbulanceCreate = {
  ambulanceName: '',
  organizationName: '',
  address: '',
  email: '',
  numbers: []
}

export const AmbulanceAddEditModal:FC<AmbulanceAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateAmbulanceDetails, handleCreateOrUpdate, isSubmitting }) => {

  const [formState, setFormState] = useState<FieldTypeAmbulanceCreate | FieldTypeAmbulanceUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateAmbulanceDetails, [toUpdateAmbulanceDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateAmbulanceDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateAmbulanceDetails){
      setFormState({
        ambulanceName: toUpdateAmbulanceDetails.ambulanceName,
        organizationName: toUpdateAmbulanceDetails.organizationName,
        address: toUpdateAmbulanceDetails.address,
        email: toUpdateAmbulanceDetails.email,
        numbers: toUpdateAmbulanceDetails.numbers
      })
    }
  }, [toUpdateAmbulanceDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Ambulance</Typography.Title>}
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
        name="ambulanceAddEditForm"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Ambulance Name"
              name="ambulanceName"
              rules={[{ required: true, message: 'Name of the Ambulance is required.' }]}
            >
              <Input name="ambulanceName" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Organization Name"
              name="organizationName"
              rules={[{ required: true, message: 'Name of the Organization is required.' }]}
            >
              <Input name="organizationName" onChange={handleInputChange} />
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


