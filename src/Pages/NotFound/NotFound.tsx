import { FC } from 'react'
import { Link } from 'react-router-dom'

import { notFound } from '../../Utils/en'
import { FlexContainer } from '../../Features/Components'

import './NotFound.scss'

export const NotFound:FC = () => {
  return(
    <FlexContainer justify="center" className={'notFoundContainer'}>
      <FlexContainer justify="center" direction="col" className={'notFoundContent'}>
        <h1 className={'notFoundTitle'}>{notFound.title}</h1>
        <h3 className={'notFoundSubTitle'}>{notFound.subTitle}</h3>
        <p className={'notFoundDetail'}>{notFound.detail}</p>
        <div className={'notFoundButtons'}>
          <Link to={notFound.redirection.url} className="notFoundNav redirectionUrl" role="button">
            {notFound.redirection.displayName}
          </Link>
          <Link to={notFound.problemUrl.url} className="notFoundNav problemUrl" role="button">
            {notFound.problemUrl.displayName}
          </Link>
        </div>
      </FlexContainer>
    </FlexContainer>
  )
}
