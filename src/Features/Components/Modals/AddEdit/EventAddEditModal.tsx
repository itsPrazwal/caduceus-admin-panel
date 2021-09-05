import { Button, Col, Divider, Form, Input, Modal, Radio, RadioChangeEvent, Row, Select, Space, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import { FormSubmitParameters, FunctionWithNoParam, FunctionWithParam, Nullable, } from '../../../../Utils/types'
import { FieldTypeEventCreate, FieldTypeEventMain, FieldTypeEventUpdate } from '../../../../Redux/Events/Types'
import { EventCategory } from '../../../../Utils/enums'

interface EventAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateEventDetails: Nullable<FieldTypeEventMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeEventCreate | FieldTypeEventUpdate>>
  isSubmitting: boolean,
}

const initialValues:FieldTypeEventCreate = {
  eventName: '',
  address: '',
  contact: [],
  eventCategory: EventCategory.MEDICAL
}

export const EventAddEditModal:FC<EventAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateEventDetails, handleCreateOrUpdate, isSubmitting }) => {

  const [formState, setFormState] = useState<FieldTypeEventCreate | FieldTypeEventUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateEventDetails, [toUpdateEventDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleCategoryChange:FunctionWithParam<EventCategory> = cat => {
    setFormState({ ...formState, eventCategory: cat })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateEventDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateEventDetails){
      setFormState({
        eventName: toUpdateEventDetails.eventName,
        address: toUpdateEventDetails.address,
        eventCategory: toUpdateEventDetails.eventCategory,
        contact: toUpdateEventDetails.contact
      })
    }
  }, [toUpdateEventDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Event</Typography.Title>}
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
        name="eventAddEditForm"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Event Category"
              name="eventCategory"
            >
              <Radio.Group name="eventCategory" defaultValue={EventCategory.MEDICAL} buttonStyle="solid" onChange={({ target: { value } }) => handleCategoryChange(value)}>
                <Space size="large">
                  <Radio.Button value={EventCategory.MEDICAL}>MEDICAL</Radio.Button>
                  <Radio.Button value={EventCategory.BLOOD}>BLOOD</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Event Name"
              name="eventName"
              rules={[{ required: true, message: 'Name of the Event is required.' }]}
            >
              <Input name="eventName" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact Number"
              name="contact"
              rules={[{ required: true, message: 'At-least one number is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string[]) => handleSelectChange({ value, name:'contact' })}
                open={false}
              />
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


