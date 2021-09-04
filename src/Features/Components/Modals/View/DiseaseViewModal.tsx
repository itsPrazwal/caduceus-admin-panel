import React, { FC } from 'react'
import { FieldTypeDiseaseMain } from '../../../../Redux/Diseases/Types'
import { Col, Divider, Empty, List, Modal, Row, Tag, Typography } from 'antd'
import { FunctionWithNoParam, Nullable } from '../../../../Utils/types'
import { CheckCircleOutlined } from '@ant-design/icons'

interface DiseaseViewModalProps {
    modalVisibility: boolean,
    viewData: Nullable<FieldTypeDiseaseMain>,
    closeModal: FunctionWithNoParam
}

export const DiseaseViewModal:FC<DiseaseViewModalProps> = ({ viewData, modalVisibility, closeModal }) => {
  return(
    <Modal
      title={<Typography.Title level={3} className={'text-center'}>{viewData?.name.toUpperCase() || 'NO DATA'}</Typography.Title>}
      closable={true}
      onCancel={closeModal}
      width={1000}
      footer={false}
      visible={modalVisibility}
      destroyOnClose={true}
    >
      {viewData
        ?
        <>
          <TaggedRow data={viewData.bodyPart} title={'Body Parts'} />
          <ListedRow title={'Causes'} data={viewData.causes} />
          <ListedRow title={'Symptoms'} data={viewData.symptoms} />
          <ListedRow title={'Complications'} data={viewData.complications} />
          <ListedRow title={'Home Remedies'} data={viewData.homeRemedy} />
          <ListedRow title={'Prevention'} data={viewData.prevention} />
          <ListedRow title={'Risk Factors'} data={viewData.riskFactors} />
        </>
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Disease data not found." />
      }
    </Modal>
  )
}

const ListedRow:FC<{data?: string[], title: string }> = ({ data, title }) => {
  return(
    <Row style={{ marginBottom: '20px' }}>
      <Col span={24}>
        {data && data.length > 0
          ? <List
            size="small"
            header={<Typography.Title level={5}>{title}</Typography.Title>}
            dataSource={data}
            renderItem={(item, i) => <List.Item>{`${i+1}:   ${item}`}</List.Item>}
          />
          : <>
            <Typography.Title level={5}>{title}</Typography.Title>
            <Divider  />
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </>
        }
      </Col>
    </Row>
  )
}

const TaggedRow:FC<{data?: string[], title: string }> = ({ data, title }) => {
  return(
    <Row style={{ marginBottom: '20px' }}>
      <Col span={24}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Divider  />
        {data && data.length > 0
          ? data.map(da => <Tag key={da} color="cyan"><CheckCircleOutlined /> {da}</Tag>)
          : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Col>
    </Row>
  )
}
