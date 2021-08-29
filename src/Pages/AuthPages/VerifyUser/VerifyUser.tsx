import { FC, useEffect, useState } from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { apiAuthVerifyUser } from '../../../Redux/AuthRedux/AuthApi'
import { Nullable } from '../../../Utils/types'
import { Loading } from '../../../Features/Components'
import { AxiosError, AxiosResponse } from 'axios'

const VerifyUserPage:FC = () => {
  const history = useHistory()
  const [message, setMessage] = useState<Nullable<string>>(null)
  useEffect(() => {
    if(history && history.location.pathname && history.location.pathname.split('/').length === 4){
      const token = history.location.pathname.split('/')[3]
      requestVerification(token)
    }else{
      history.push('/')
    }
  }, [history])

  const requestVerification = async (token: string) => {
    try {
      const res:AxiosResponse = await apiAuthVerifyUser({ token })
      if(res.data){
        setMessage('User has been verified successfully. Thank you!!!')
      }
    }catch (err){
      setMessage((err as AxiosError).response?.data?.message || 'Error verifying user.')
    }
  }

  return(
    <Row>
      {message
        ?
        <Col span={24}>
          <Typography.Text>{message || 'Verifying User...'}</Typography.Text>
          <Divider />
          <Typography.Link onClick={() => history.push('/')} >Go to Dashboard</Typography.Link>
        </Col>
        : <Loading />
      }
    </Row>
  )
}

export { VerifyUserPage }
