import React, { FC, useMemo, useState } from 'react'
import { Col, Image, Layout, Menu, Row, Typography } from 'antd'
import { useHistory } from 'react-router-dom'

import { SignOutBut } from '../../SignOut'

import { AdminSideBarItems } from '../../../../../Utils/constants'
import { FunctionWithNoParam } from '../../../../../Utils/types'
import { ChangePassword } from '../../ChangePassword'
import { useSelector } from 'react-redux'
import { AuthReducerState } from '../../../../../Redux/AuthRedux/AuthTypes'
import { RootState } from '../../../../../Redux/rootReducers'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

interface ActiveKeys {
  itemKey: string,
  openKey: string,
}

const AdminLayout: FC = props => {
  const { children } = props
  const history = useHistory<History>()
  const [collapsed, setCollapsed]=useState<boolean>(false)
  const { userInformation }: AuthReducerState = useSelector((state: RootState) => state.AuthReducer)

  const handleCollapse:FunctionWithNoParam = () => {
    setCollapsed(!collapsed)
  }

  const activeKeys: ActiveKeys = useMemo(() =>
    AdminSideBarItems.reduce((acc:ActiveKeys, curr) => {
      const _path = history.location.pathname
      if(acc.itemKey === ''){
        if(curr.path === ''){
          curr.subMenu.map(csm => {
            if(acc.itemKey === '' && _path.localeCompare(csm.path) === 0)
              acc = { itemKey: csm.key, openKey: curr.key }
          })
        }else{
          if(_path.localeCompare(curr.path) === 0)
            acc = { ...acc, itemKey: curr.key }
        }
      }
      return acc
    }, { itemKey: '', openKey: '' }
    ), [history])

  return(
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header unselectable" style={{ position: 'fixed', zIndex: 999, width: '100%', height: '60px' }}>
        <Row>
          <Col span={8} style={{ textAlign: 'left', alignItems:'center' }}>
            <Typography.Text style={{ color: 'whitesmoke' }} title="User">
              {userInformation?.name || 'ADMIN'}
            </Typography.Text>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Image src={`${process.env.PUBLIC_URL}/Images/LOGO.svg`} />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <SignOutBut />
            <ChangePassword />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} className="site-layout-background unselectable" style={{ overflow: 'auto', height: '100vh', margin: '60px 0 0', position: 'fixed', left: 0 }}>
          <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)', alignItems: 'center', display: 'flex', justifyContent: 'center' }} title="User Role">
            <Typography.Text style={{ color: 'white' }}>ADMIN</Typography.Text>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeKeys.itemKey]} defaultOpenKeys={[activeKeys.openKey]}>
            {AdminSideBarItems.map(each =>
              each.subMenu.length
                ?
                <SubMenu key={each.key} icon={<each.icon />} title={each.label}>
                  {each.subMenu.map(itm => (
                    <Menu.Item onClick={()=>history.push(`${itm.path}`)} key={itm.key}>
                      {itm.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
                :
                <Menu.Item onClick={() => history.push(`${each.path}`)} key={each.key} icon={<each.icon />}>
                  {each.label}
                </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background" style={{ margin: collapsed ? '60px 0 0 80px' : '60px 0 0 200px', overflow: 'hidden', padding: 24 }} >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export { AdminLayout }
