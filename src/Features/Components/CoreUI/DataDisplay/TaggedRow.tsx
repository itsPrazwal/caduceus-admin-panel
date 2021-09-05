import React, { FC } from 'react'
import { Col, Divider, Empty, Row, Tag, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

export const TaggedRow:FC<{data?: string[], title: string }> = ({ data, title }) => {
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
