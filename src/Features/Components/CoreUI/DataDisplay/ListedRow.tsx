import React, { FC } from 'react'
import { Col, Divider, Empty, List, Row, Typography } from 'antd'

export const ListedRow:FC<{data?: string[], title: string }> = ({ data, title }) => {
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
