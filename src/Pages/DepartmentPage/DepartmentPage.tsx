import { FC, useEffect, useState } from 'react'
import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeDepartmentCreate,
  FieldTypeDepartmentMain,
  FieldTypeDepartmentUpdate,
  ReducerDepartmentType
} from '../../Redux/Department/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { departmentAction, diseaseAction } from '../../Redux'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { OperationStatus } from '../../Utils/enums'
import { DepartmentAddEditModal, DepartmentViewModal } from '../../Features/Components'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
  SelectOptionDataType
} from '../../Utils/types'
import { ReducerDiseaseType } from '../../Redux/Diseases/Types'
import { dataReFetchMaxDiff } from '../../Utils/constants'

const DepartmentPage:FC = () => {

  const columns: ColumnsType<FieldTypeDepartmentMain> = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <Typography.Title level={5}>{text}</Typography.Title>
    },
    {
      title: 'Related Diseases',
      dataIndex: 'relatedDiseases',
      key: 'relatedDiseases',
      render: relatedDiseases => <AvailabilityRender data={relatedDiseases} />
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

  const  { departmentLastFetchedTime, operationStatus, departmentData }: ReducerDepartmentType = useSelector((state:RootState) => state.DepartmentReducer)
  const  { diseaseLastFetchedTime, diseaseData }: ReducerDiseaseType = useSelector((state:RootState) => state.DiseaseReducer)
  const [modalVisibility, setModalVisibility] = useState<{ view: boolean, form: boolean }>({ form: false, view: false })
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeDepartmentMain>>(null)
  const [toViewDetails, setToViewDetails] = useState<Nullable<FieldTypeDepartmentMain>>(null)
  const [diseaseList, setDiseaseList] = useState<SelectOptionDataType[]>([])

  useEffect(() =>{
    if(!departmentData || (Date.now() - departmentLastFetchedTime) > dataReFetchMaxDiff) {
      dispatch(departmentAction.list.request())
    }
  }, [dispatch, departmentData, departmentLastFetchedTime])

  useEffect(() => {
    if(!diseaseData || (Date.now() - diseaseLastFetchedTime) > dataReFetchMaxDiff){
      dispatch(diseaseAction.list.request())
    }else{
      setDiseaseList(diseaseData.map(dd => ({ name: dd.name, value: dd._id } as SelectOptionDataType)))
    }
  }, [dispatch, diseaseData, diseaseLastFetchedTime])

  useEffect(() => {
    if(operationStatus.create === OperationStatus.SUCCEEDED || operationStatus.update === OperationStatus.SUCCEEDED) closeFormModal()
  }, [operationStatus])

  const closeFormModal:FunctionWithNoParam = () => {
    setToUpdateDetails(null)
    setModalVisibility(prevState => ({ ...prevState, form: false }))
  }

  const openFormModal:FunctionWithParam<Nullable<FieldTypeDepartmentMain>> = data => {
    setToUpdateDetails(data)
    setModalVisibility(prevState => ({ ...prevState, form: true }))
  }

  const openViewModal:FunctionWithParam<FieldTypeDepartmentMain> = data => {
    const viewData = { ...data, relatedDiseases: data.relatedDiseases && data.relatedDiseases.length > 0
      ? diseaseData?.reduce((acc: string[], curr) => data.relatedDiseases.indexOf(curr._id) > -1 ? [...acc, curr.name] : acc, []) as string[]
      : data.relatedDiseases }
    setToViewDetails(viewData)
    setModalVisibility(prevState => ({ ...prevState, view: true }))
  }

  const closeViewModal:FunctionWithNoParam = () => {
    setToViewDetails(null)
    setModalVisibility(prevState => ({ ...prevState, view: false }))
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeDepartmentCreate | FieldTypeDepartmentUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? departmentAction.update.request(values as FieldTypeDepartmentUpdate)
      : departmentAction.create.request(values as FieldTypeDepartmentCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(departmentAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>Departments</Typography.Title>
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
            dataSource={departmentData as FieldTypeDepartmentMain[]}
          />
        </Col>
      </Row>
      <DepartmentAddEditModal
        closeModal={closeFormModal}
        modalVisibility={modalVisibility.form}
        toUpdateDepartmentDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
        diseaseList={diseaseList}
      />
      <DepartmentViewModal modalVisibility={modalVisibility.view} viewData={toViewDetails} closeModal={closeViewModal} />
    </>
  )
}

const AvailabilityRender:FC<{data: string[]}> = ({ data }) => {
  const availability:boolean = data && data.length > 0
  return <Tag color={availability ? 'green' : 'red'}>{availability ? 'Available' : 'Not Available'}</Tag>

}

export { DepartmentPage }
