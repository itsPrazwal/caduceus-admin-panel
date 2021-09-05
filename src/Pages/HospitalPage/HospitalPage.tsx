import { FC, useEffect, useState } from 'react'
import { Button, Col, Empty, List, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FieldTypeHospitalCreate,
  FieldTypeHospitalMain,
  FieldTypeHospitalUpdate,
  ReducerHospitalType
} from '../../Redux/Hospital/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/rootReducers'
import { RootDispatch } from '../../Redux/Store'
import { ambulanceAction, hospitalAction } from '../../Redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { OperationStatus } from '../../Utils/enums'
import { HospitalAddEditModal } from '../../Features/Components'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from '../../Utils/types'
import { dataReFetchMaxDiff } from '../../Utils/constants'
import { ReducerAmbulanceType } from '../../Redux/Ambulance/Types'
import { ListedRow } from '../../Features/Components/CoreUI/DataDisplay'

const HospitalPage:FC = () => {

  const columns: ColumnsType<FieldTypeHospitalMain> = [
    {
      title: 'Hospital Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
      render: (speciality: string[]) => <List dataSource={speciality} renderItem={ri => <List.Item>{ri}</List.Item>} />
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

  const  { hospitalLastFetchedTime, operationStatus, hospitalData }: ReducerHospitalType = useSelector((state:RootState) => state.HospitalReducer)
  const  { ambulanceLastFetchedTime, ambulanceData }: ReducerAmbulanceType = useSelector((state:RootState) => state.AmbulanceReducer)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [toUpdateDetails, setToUpdateDetails] = useState<Nullable<FieldTypeHospitalMain>>(null)
  const [hospitalSpecialityList, setHospitalSpecialityList] = useState<Nullable<string[]>>(null)

  useEffect(() =>{
    if(!hospitalData || (Date.now() - hospitalLastFetchedTime) > dataReFetchMaxDiff) {
      dispatch(hospitalAction.list.request())
    }else{
      setHospitalSpecialityList(hospitalData.reduce((acc: string[], curr) => {
        curr.speciality?.map(csy => acc.indexOf(csy) > -1 ? null : acc.push(csy))
        return acc
      } , []))
    }
  }, [dispatch, hospitalData, hospitalLastFetchedTime])


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

  const openFormModal:FunctionWithParam<Nullable<FieldTypeHospitalMain>> = data => {
    setToUpdateDetails(data ? { ...data, ambulanceNumber: data.ambulanceId ? ambulanceData?.filter(ad => ad._id === data.ambulanceId)[0]?.numbers : [] } : null)
    setModalVisibility(true)
  }

  const handleCreateOrUpdate:FunctionWithParam<FormSubmitParameters<FieldTypeHospitalCreate | FieldTypeHospitalUpdate> > = ({ isUpdate, values }) => {
    dispatch(isUpdate
      ? hospitalAction.update.request(values as FieldTypeHospitalUpdate)
      : hospitalAction.create.request(values as FieldTypeHospitalCreate)
    )
  }

  const handleDeleteDisease:FunctionWithParam<string> = diseaseId => {
    dispatch(hospitalAction.remove.request({ _id: diseaseId }))
  }

  return(
    <>
      <Row>
        <Col span={12}>
          <Typography.Title level={2}>Hospitals</Typography.Title>
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
            dataSource={hospitalData as FieldTypeHospitalMain[]}
            expandedRowRender={record => (
              <Row gutter={20}>
                <Col span={12}>
                  <Typography.Title level={5}>Description: </Typography.Title>
                  <Typography.Text>{record.detail}</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Title level={5}>Ambulance Detail: </Typography.Title>
                  {record.ambulanceId
                    ? <ListedRow title="Contact Details" data={ambulanceData?.filter(ad => ad._id === record.ambulanceId)[0]?.numbers} />
                    : <Empty />
                  }
                </Col>
              </Row>
            )}
          />
        </Col>
      </Row>
      <HospitalAddEditModal
        closeModal={closeFormModal}
        hospitalSpecialityList={hospitalSpecialityList}
        modalVisibility={modalVisibility}
        toUpdateHospitalDetails={toUpdateDetails}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isSubmitting={operationStatus.create === OperationStatus.IN_PROGRESS || operationStatus.update === OperationStatus.IN_PROGRESS}
      />
    </>
  )
}

export { HospitalPage }
