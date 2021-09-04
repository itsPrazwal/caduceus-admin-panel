import { FC, useEffect, useState } from 'react'
import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeDiseaseCreate,
  FieldTypeDiseaseMain,
  FieldTypeDiseaseUpdate,
  ReducerDiseaseType
} from '../../Redux/Diseases/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { diseaseAction } from '../../Redux'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { OperationStatus } from '../../Utils/enums'
import { DiseaseAddEditModal, DiseaseViewModal } from '../../Features/Components'
import { FormSubmitParameters, FunctionWithNoParam, FunctionWithParam, Nullable } from '../../Utils/types'

const DiseasePage:FC = () => {

  const columns: ColumnsType<FieldTypeDiseaseMain> = [
    {
      title: 'Disease Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <Typography.Title level={5}>{text}</Typography.Title>
    },
    {
      title: 'Body Parts',
      dataIndex: 'bodyPart',
      key: 'bodyPart',
      render: bodyParts => <AvailabilityRender data={bodyParts} />
    },
    {
      title: 'Causes',
      dataIndex: 'causes',
      key: 'causes',
      render: causes => <AvailabilityRender data={causes} />
    },
    {
      title: 'Complications',
      dataIndex: 'complications',
      key: 'complications',
      render: complications => <AvailabilityRender data={complications} />,
      responsive: ['xxl'],
    },
    {
      title: 'Home Remedy',
      dataIndex: 'homeRemedy',
      key: 'homeRemedy',
      render: homeRemedy => <AvailabilityRender data={homeRemedy} />,
      responsive: ['xxl'],
    },
    {
      title: 'Prevention',
      dataIndex: 'prevention',
      key: 'prevention',
      render: prevention => <AvailabilityRender data={prevention} />
    },
    {
      title: 'Risk Factors',
      dataIndex: 'riskFactors',
      key: 'riskFactors',
      render: riskFactors => <AvailabilityRender data={riskFactors} />
    },
    {
      title: 'Symptoms',
      dataIndex: 'symptoms',
      key: 'symptoms',
      render: symptoms => <AvailabilityRender data={symptoms} />
    },
    {
      title: 'Action',
      key: 'action',
      width: '250px',
      align: 'center',
      render: (text, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => openViewModal(record)}><EyeOutlined />View</Button>
          <Button type="link" onClick={() => openFormModal(record)}><EditOutlined /> Update</Button>
          <Button type="dashed" onClick={() => handleDeleteDisease(record._id)}><DeleteOutlined /> Delete</Button>
        </Space>
      ),
    },
  ]

  const dispatch = useDispatch<RootDispatch>()

  const  { operationStatus, diseaseData }: ReducerDiseaseType = useSelector((state:RootState) => state.DiseaseReducer)
  const [modalVisibility, setModalVisibility] = useState<{ view: boolean, form: boolean }>({ form: false, view: false })
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeDiseaseMain>>(null)
  const [toViewDetails, setToViewDetails] = useState<Nullable<FieldTypeDiseaseMain>>(null)
  const [diseaseDataList, setDiseaseDataList] = useState<{bodyPart: Nullable<string[]>}>({ bodyPart: null })

  useEffect(() =>{
    if(!diseaseData) {
      dispatch(diseaseAction.list.request())
    }else{
      setDiseaseDataList(prevState => ({
        ...prevState,
        bodyPart: diseaseData.reduce((acc: string[], curr) => {
          curr.bodyPart.map(cbp => acc.indexOf(cbp) > -1 ? null : acc.push(cbp))
          return acc
        } , [])
      }))
    }
  }, [dispatch, diseaseData])

  useEffect(() => {
    if(operationStatus.create === OperationStatus.SUCCEEDED || operationStatus.update === OperationStatus.SUCCEEDED) closeFormModal()
  }, [operationStatus])

  const closeFormModal:FunctionWithNoParam = () => {
    setToUpdateDetails(null)
    setModalVisibility(prevState => ({ ...prevState, form: false }))
  }

  const openFormModal:FunctionWithParam<Nullable<FieldTypeDiseaseMain>> = data => {
    setToUpdateDetails(data)
    setModalVisibility(prevState => ({ ...prevState, form: true }))
  }

  const openViewModal:FunctionWithParam<FieldTypeDiseaseMain> = data => {
    setToViewDetails(data)
    setModalVisibility(prevState => ({ ...prevState, view: true }))
  }

  const closeViewModal:FunctionWithNoParam = () => {
    setToViewDetails(null)
    setModalVisibility(prevState => ({ ...prevState, view: false }))
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeDiseaseCreate | FieldTypeDiseaseUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? diseaseAction.update.request(values as FieldTypeDiseaseUpdate)
      : diseaseAction.create.request(values as FieldTypeDiseaseCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(diseaseAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>Diseases</Typography.Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => openFormModal(null)}>Add New</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            pagination={{ pageSize: 50 }}
            loading={operationStatus.list === OperationStatus.IN_PROGRESS}
            rowKey={r => r._id}
            columns={columns}
            dataSource={diseaseData as FieldTypeDiseaseMain[]}
          />
        </Col>
      </Row>
      <DiseaseAddEditModal
        closeModal={closeFormModal}
        modalVisibility={modalVisibility.form}
        toUpdateDiseaseDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
        diseaseDataList={diseaseDataList}
      />
      <DiseaseViewModal modalVisibility={modalVisibility.view} viewData={toViewDetails} closeModal={closeViewModal} />
    </>
  )
}

const AvailabilityRender:FC<{data: string[]}> = ({ data }) => {
  const availability:boolean = data && data.length > 0
  return <Tag color={availability ? 'green' : 'red'}>{availability ? 'Available' : 'Not Available'}</Tag>

}

export { DiseasePage }
