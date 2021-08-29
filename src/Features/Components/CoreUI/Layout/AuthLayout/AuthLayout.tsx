import { FC } from 'react'
import { Layout } from 'antd'

import './AuthLayout.scss'

export const AuthLayout:FC = ({ children }) => {
  return(
    <Layout className="authLayout_layout">
      <Layout.Content className="authLayout_content">
        {children}
      </Layout.Content>
    </Layout>
  )
}
