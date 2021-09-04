import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import { FormSubmitParameters, FunctionWithNoParam, FunctionWithParam, Nullable } from '../../../../Utils/types'
import { FieldTypeDiseaseCreate, FieldTypeDiseaseMain, FieldTypeDiseaseUpdate } from '../../../../Redux/Diseases/Types'

interface DiseaseAddUpdateProps {
  closeModal: FunctionWithNoParam,
  modalVisibility: boolean,
  toUpdateDiseaseDetails: Nullable<FieldTypeDiseaseMain>,
  handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeDiseaseCreate | FieldTypeDiseaseUpdate>>
  isSubmitting: boolean,
  diseaseDataList: {
      bodyPart: Nullable<string[]>
  }
}

const initialValues:FieldTypeDiseaseCreate = {
  name: '',
  bodyPart: [],
  causes: [],
  symptoms: [],
  complications: [],
  homeRemedy: [],
  prevention: [],
  riskFactors: []
}

export const DiseaseAddEditModal:FC<DiseaseAddUpdateProps> = ({ closeModal, modalVisibility, toUpdateDiseaseDetails, handleCreateOrUpdate, isSubmitting, diseaseDataList }) => {

  const [formState, setFormState] = useState<FieldTypeDiseaseCreate | FieldTypeDiseaseUpdate>(initialValues)

  const isUpdate:boolean = useMemo(() => !!toUpdateDiseaseDetails, [toUpdateDiseaseDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string | string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish:FunctionWithNoParam = () => {
    handleCreateOrUpdate({ isUpdate, values: isUpdate ? { ...formState, _id: toUpdateDiseaseDetails?._id } : formState })
  }

  useEffect(() => {
    if(toUpdateDiseaseDetails){
      setFormState({
        name: toUpdateDiseaseDetails.name,
        bodyPart: toUpdateDiseaseDetails.bodyPart,
        causes: toUpdateDiseaseDetails.causes,
        symptoms: toUpdateDiseaseDetails.symptoms,
        complications: toUpdateDiseaseDetails.complications,
        homeRemedy: toUpdateDiseaseDetails.homeRemedy,
        prevention: toUpdateDiseaseDetails.prevention,
        riskFactors: toUpdateDiseaseDetails.riskFactors,
      })
    }
  }, [toUpdateDiseaseDetails])

  return (
    <Modal
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} Disease</Typography.Title>}
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
        name="diseaseAddEditForm"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Disease Name"
              name="name"
              rules={[{ required: true, message: 'Name of the disease is required.' }]}
            >
              <Input name="name" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Body Parts"
              name="bodyPart"
              rules={[{ required: true, message: 'At-least one body part is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'bodyPart' })}
                {...Object.assign({}, diseaseDataList.bodyPart && diseaseDataList?.bodyPart?.length > 0 ? null : { open: false })}
              >
                {diseaseDataList.bodyPart?.map((bp, i) => (
                  <Select.Option key={i} value={bp}>{bp}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Causes"
              name="causes"
              rules={[{ required: true, message: 'At-least one cause is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'causes' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Symptoms"
              name="symptoms"
              rules={[{ required: true, message: 'At-least one symptom is required.' }]}
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'symptoms' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Complications"
              name="complications"
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'complications' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Home Remedy"
              name="homeRemedy"
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'homeRemedy' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Prevention"
              name="prevention"
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'prevention' })}
                open={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Risk Factors"
              name="riskFactors"
            >
              <Select
                mode="tags"
                onChange={(value: string) => handleSelectChange({ value, name:'riskFactors' })}
                open={false}
              />
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


