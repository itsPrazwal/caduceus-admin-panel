import React, { FC } from 'react'
import { FieldTypeDiseaseMain } from '../../../../Redux/Diseases/Types'
import { Empty, Modal, Typography } from 'antd'
import { FunctionWithNoParam, Nullable } from '../../../../Utils/types'
import { ListedRow, TaggedRow } from '../../CoreUI/DataDisplay'

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
