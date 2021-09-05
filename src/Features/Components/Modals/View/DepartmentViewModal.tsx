import React, { FC } from 'react'
import { FieldTypeDepartmentMain } from '../../../../Redux/Department/Types'
import { Empty, Modal, Typography } from 'antd'
import { FunctionWithNoParam, Nullable } from '../../../../Utils/types'
import { ListedRow } from '../../CoreUI/DataDisplay'

interface DepartmentViewModalProps {
    modalVisibility: boolean,
    viewData: Nullable<FieldTypeDepartmentMain>,
    closeModal: FunctionWithNoParam
}

export const DepartmentViewModal:FC<DepartmentViewModalProps> = ({ viewData, modalVisibility, closeModal }) => {
  return(
    <Modal
      title={<Typography.Title level={3} className={'text-center'}>{viewData?.name.toUpperCase() || 'NO DATA'}</Typography.Title>}
      closable={true}
      onCancel={closeModal}
      width={800}
      footer={false}
      visible={modalVisibility}
      destroyOnClose={true}
    >
      {viewData
        ?
        <>
          <ListedRow title={'Related Diseases'} data={viewData.relatedDiseases} />
        </>
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Department data not found." />
      }
    </Modal>
  )
}
