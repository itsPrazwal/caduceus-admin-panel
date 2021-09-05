import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../../../Utils/types'
import { FieldTypeHospitalCreate, FieldTypeHospitalMain, FieldTypeHospitalUpdate } from '../../../../Redux/Hospital/Types'

interface HospitalAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateHospitalDetails: Nullable<FieldTypeHospitalMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeHospitalCreate | FieldTypeHospitalUpdate>>
  isSubmitting: boolean,
  hospitalSpecialityList: Nullable<string[]>
}

const initialValues:FieldTypeHospitalCreate = {
  name: '',
  address: '',
  email: '',
  numbers: [],
  detail: '',
  speciality: []
}

export const HospitalAddEditModal:FC<HospitalAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateHospitalDetails, hospitalSpecialityList, handleCreateOrUpdate, isSubmitting }) => {

  const [formState, setFormState] = useState<FieldTypeHospitalCreate | FieldTypeHospitalUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateHospitalDetails, [toUpdateHospitalDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateHospitalDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateHospitalDetails){
      setFormState({
        name: toUpdateHospitalDetails.name,
        detail: toUpdateHospitalDetails.detail,
        address: toUpdateHospitalDetails.address,
        email: toUpdateHospitalDetails.email,
        numbers: toUpdateHospitalDetails.numbers,
        speciality: toUpdateHospitalDetails.speciality,
        ambulanceNumber: toUpdateHospitalDetails.ambulanceNumber
      })
    }
  }, [toUpdateHospitalDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Hospital</Typography.Title>}
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
              label="Hospital Name"
              name="name"
              rules={[{ required: true, message: 'Name of the Hospital is required.' }]}
            >
              <Input name="name" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hospital Number"
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
              rules={[{ required: true, message: 'Hospital address is required.' }]}
            >
              <Input name="address" onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Speciality"
              name="speciality"
            >
              <Select
                mode="tags"
                onChange={(value: string[]) => handleSelectChange({ value, name:'speciality' })}
                {...Object.assign({}, hospitalSpecialityList && hospitalSpecialityList?.length > 0 ? null : { open: false })}
              >
                {hospitalSpecialityList?.map((hsl, i) => (
                  <Select.Option key={i} value={hsl}>{hsl}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ambulance Number"
              name="ambulanceNumber"
            >
              <Select
                mode="tags"
                onChange={(value: string[]) => handleSelectChange({ value, name:'ambulanceNumber' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Description"
              name="detail"
            >
              <Input.TextArea rows={4} name="detail" onChange={handleInputChange} />
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


