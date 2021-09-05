import { FC, useEffect, useState } from 'react'
import { Button, Col, List, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeBloodBankCreate,
  FieldTypeBloodBankMain,
  FieldTypeBloodBankUpdate,
  ReducerBloodBankType
} from '../../Redux/BloodBank/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { bloodBankAction } from '../../Redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { OperationStatus } from '../../Utils/enums'
import { BloodBankAddEditModal } from '../../Features/Components'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../Utils/types'
import { dataReFetchMaxDiff } from '../../Utils/constants'

const BloodBankPage:FC = () => {

  const columns: ColumnsType<FieldTypeBloodBankMain> = [
    {
      title: 'BloodBank Name',
      dataIndex: 'bloodBankName',
      key: 'bloodBankName',
      render: text => <Typography.Title level={5}>{text}</Typography.Title>
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

  const  { bloodBankLastFetchedTime, operationStatus, bloodBankData }: ReducerBloodBankType = useSelector((state:RootState) => state.BloodBankReducer)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeBloodBankMain>>(null)

  useEffect(() =>{
    if(!bloodBankData || (Date.now() - bloodBankLastFetchedTime) > dataReFetchMaxDiff) {
      dispatch(bloodBankAction.list.request())
    }
  }, [dispatch, bloodBankData, bloodBankLastFetchedTime])

  useEffect(() => {
    if(operationStatus.create === OperationStatus.SUCCEEDED || operationStatus.update === OperationStatus.SUCCEEDED) closeFormModal()
  }, [operationStatus])

  const closeFormModal:FunctionWithNoParam = () => {
    setToUpdateDetails(null)
    setModalVisibility(false)
  }

  const openFormModal:FunctionWithParam<Nullable<FieldTypeBloodBankMain>> = data => {
    setToUpdateDetails(data)
    setModalVisibility(true)
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeBloodBankCreate | FieldTypeBloodBankUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? bloodBankAction.update.request(values as FieldTypeBloodBankUpdate)
      : bloodBankAction.create.request(values as FieldTypeBloodBankCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(bloodBankAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>BloodBanks</Typography.Title>
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
            dataSource={bloodBankData as FieldTypeBloodBankMain[]}
          />
        </Col>
      </Row>
      <BloodBankAddEditModal
        closeModal={closeFormModal}
        modalVisibility={modalVisibility}
        toUpdateBloodBankDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
      />
    </>
  )
}

export { BloodBankPage }
