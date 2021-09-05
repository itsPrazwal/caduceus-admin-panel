import { FC, useEffect, useState } from 'react'
import { Button, Col, List, Row, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeEventCreate,
  FieldTypeEventMain,
  FieldTypeEventUpdate,
  ReducerEventType
} from '../../Redux/Events/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { eventAction } from '../../Redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { EventCategory, OperationStatus } from '../../Utils/enums'
import { EventAddEditModal } from '../../Features/Components'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../Utils/types'
import { dataReFetchMaxDiff } from '../../Utils/constants'

const EventPage:FC = () => {

  const columns: ColumnsType<FieldTypeEventMain> = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      render: text => <Typography.Title level={5}>{text}</Typography.Title>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Category',
      dataIndex: 'eventCategory',
      key: 'eventCategory',
      render: (category: EventCategory) => <Tag color={category === EventCategory.BLOOD ? 'red' : 'cyan'}>{category.toUpperCase()}</Tag>
    },
    {
      title: 'Numbers',
      dataIndex: 'contact',
      key: 'contact',
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

  const  { eventLastFetchedTime, operationStatus, eventData }: ReducerEventType = useSelector((state:RootState) => state.EventReducer)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeEventMain>>(null)

  useEffect(() =>{
    if(!eventData || (Date.now() - eventLastFetchedTime) > dataReFetchMaxDiff) {
      dispatch(eventAction.list.request())
    }
  }, [dispatch, eventData, eventLastFetchedTime])

  useEffect(() => {
    if(operationStatus.create === OperationStatus.SUCCEEDED || operationStatus.update === OperationStatus.SUCCEEDED) closeFormModal()
  }, [operationStatus])

  const closeFormModal:FunctionWithNoParam = () => {
    setToUpdateDetails(null)
    setModalVisibility(false)
  }

  const openFormModal:FunctionWithParam<Nullable<FieldTypeEventMain>> = data => {
    setToUpdateDetails(data)
    setModalVisibility(true)
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeEventCreate | FieldTypeEventUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? eventAction.update.request(values as FieldTypeEventUpdate)
      : eventAction.create.request(values as FieldTypeEventCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(eventAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>Events</Typography.Title>
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
            dataSource={eventData as FieldTypeEventMain[]}
          />
        </Col>
      </Row>
      <EventAddEditModal
        closeModal={closeFormModal}
        modalVisibility={modalVisibility}
        toUpdateEventDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
      />
    </>
  )
}

export { EventPage }
