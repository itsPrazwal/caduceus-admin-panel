import { FC, useEffect, useState } from 'react'
import { Button, Col, List, Row, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeAmbulanceCreate,
  FieldTypeAmbulanceMain,
  FieldTypeAmbulanceUpdate,
  ReducerAmbulanceType
} from '../../Redux/Ambulance/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { ambulanceAction } from '../../Redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { OperationStatus } from '../../Utils/enums'
import { AmbulanceAddEditModal } from '../../Features/Components'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../Utils/types'
import { dataReFetchMaxDiff } from '../../Utils/constants'

const AmbulancePage:FC = () => {

  const columns: ColumnsType<FieldTypeAmbulanceMain> = [
    {
      title: 'Ambulance Name',
      dataIndex: 'ambulanceName',
      key: 'ambulanceName',
      render: text => <Typography.Title level={5}>{text}</Typography.Title>
    },
    {
      title: 'Organization',
      dataIndex: 'organizationName',
      key: 'organizationName',
      render: text => <Tag color="orange">{text}</Tag>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Numbers',
      dataIndex: 'numbers',
      key: 'numbers',
      render: (numbers: string[]) => <List dataSource={numbers} renderItem={ri => <List.Item>{ri}</List.Item>} />
    },
    {
      title: 'Action',
      key: 'action',
      width: '250px',
      align: 'center',
      render: (text, record) => (
        <Space size="small">
          <Button type="link" onClick={() => openFormModal(record)}><EditOutlined /> Update</Button>
          <Button type="dashed" onClick={() => handleDeleteDisease(record._id)}><DeleteOutlined /> Delete</Button>
        </Space>
      ),
    },
  ]

  const dispatch = useDispatch<RootDispatch>()

  const  { ambulanceLastFetchedTime, operationStatus, ambulanceData }: ReducerAmbulanceType = useSelector((state:RootState) => state.AmbulanceReducer)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeAmbulanceMain>>(null)

  useEffect(() =>{
    if(!ambulanceData || (Date.now() - ambulanceLastFetchedTime) > dataReFetchMaxDiff) {
      dispatch(ambulanceAction.list.request())
    }
  }, [dispatch, ambulanceData, ambulanceLastFetchedTime])

  useEffect(() => {
    if(operationStatus.create === OperationStatus.SUCCEEDED || operationStatus.update === OperationStatus.SUCCEEDED) closeFormModal()
  }, [operationStatus])

  const closeFormModal:FunctionWithNoParam = () => {
    setToUpdateDetails(null)
    setModalVisibility(false)
  }

  const openFormModal:FunctionWithParam<Nullable<FieldTypeAmbulanceMain>> = data => {
    setToUpdateDetails(data)
    setModalVisibility(true)
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeAmbulanceCreate | FieldTypeAmbulanceUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? ambulanceAction.update.request(values as FieldTypeAmbulanceUpdate)
      : ambulanceAction.create.request(values as FieldTypeAmbulanceCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(ambulanceAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>Ambulances</Typography.Title>
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
            dataSource={ambulanceData as FieldTypeAmbulanceMain[]}
          />
        </Col>
      </Row>
      <AmbulanceAddEditModal
        closeModal={closeFormModal}
        modalVisibility={modalVisibility}
        toUpdateAmbulanceDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
      />
    </>
  )
}

export { AmbulancePage }
